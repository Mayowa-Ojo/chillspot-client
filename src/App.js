import { useContext, useEffect } from "react";
import { GlobalStyles } from "twin.macro";
import { Route , Switch, useLocation } from "react-router-dom";

import { Home, Stories, Login, Signup, NotFound, Profile } from "./containers";
import { Navbar, ModalWrapper, Footer, Loading } from "./components";
import { StoreContext } from "./store";
import types from "./store/types";
import LocalStorage from "./utils/localstorage";
import httpRequest from "./services/http";
import { requestEndpoints } from "./constants";

const ls = new LocalStorage();

function App() {
   // handle modal sub-routing
   const location = useLocation();
   const background = location.state && location.state.background;

   const { dispatch } = useContext(StoreContext);

   useEffect(() => {
      reAuthenticateUser(dispatch);
   }, [dispatch]);

   return (
      <>
         <GlobalStyles />
         <Navbar />

         <Switch location={background || location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/stories" exact component={Stories} />
            <Route path="/:username" exact component={Profile} />
            <Route path="*" component={NotFound}></Route>
         </Switch>

         { background && 
           <Route path="/x/:modal" children={<ModalWrapper component={location.state.component}/>} />
         }
         <Footer />
         <Loading />
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
