import { useContext, useEffect } from "react";
import { GlobalStyles } from "twin.macro";
import { Route , Switch, useLocation } from "react-router-dom";

import { Home, Stories, Login, Signup, NotFound, Profile, AccountSettings } from "./containers";
import { Navbar, ModalWrapper, Footer, Loading, Toast } from "./components";
import { StoreContext } from "./store";
import { requestEndpoints } from "./constants";
import types from "./store/types";
import LocalStorage from "./utils/localstorage";
import httpRequest from "./services/http";
import ProtectedRoute from "./components/ProtectedRoute";

const ls = new LocalStorage();

function App() {
   // handle modal sub-routing
   const location = useLocation();
   const background = location.state && location.state.background;

   const { dispatch } = useContext(StoreContext);

   useEffect(() => {
      (async () => {
         await reAuthenticateUser(dispatch);
      })();
   }, [dispatch]);

   return (
      <>
         <GlobalStyles />
         <Navbar />

         <Switch location={background || location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            {/* <Route path="/stories" exact component={Stories} /> */}
            <ProtectedRoute path="/stories" children={<Stories />} />
            <ProtectedRoute path="/account" children={<AccountSettings />} />
            <ProtectedRoute path="/u/:username" children={<Profile />} />
            <Route path="*" component={NotFound}></Route>
         </Switch>

         { background && 
           <ProtectedRoute path="/x/:modal" children={<ModalWrapper component={location.state.component}/>} />
         }
         <Footer />
         <Loading />
         <Toast />
      </>
   );
}

const reAuthenticateUser = async (dispatch) => {
   const { token, id } = ls.get("user") || {};

   if(!token) {
      console.warn("[WARNING]: no auth token found");
      return;
   }

   try {
      const { data: response } = await httpRequest(requestEndpoints.users.one(id), {
         method: "GET",
      });

      dispatch({
         namespace: "auth",
         type: types.SET_USER,
         payload: { ...response.data.user }
      });

   } catch (err) {
      console.error(err.response || err.message);
   }
}

export default App;
