import { GlobalStyles } from "twin.macro";
import { Route , Switch, useLocation } from "react-router-dom";

import { Home, Stories, Login, Signup, NotFound, Profile } from "./containers";
import { Navbar, ModalWrapper, Footer, Loading } from "./components";
import Store from "./store";

function App() {
   // handle modal sub-routing
   const location = useLocation();
   const background = location.state && location.state.background;

   return (
      <Store>
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
      </Store>
   );
}

export default App;
