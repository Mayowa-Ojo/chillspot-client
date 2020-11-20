import { GlobalStyles } from "twin.macro";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";

import { Home, Stories, Login, Signup, NotFound } from "./containers";
import { Navbar, ModalWrapper } from "./components";
import Store from "./store";

function App() {
   return (
      <Store>
      <Router>
         <GlobalStyles />
         <Navbar />

         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/stories" exact component={Stories} />
            <Route path="*" component={NotFound}></Route>
         </Switch>

         <ModalWrapper />
      </Router>
      </Store>
   );
}

export default App;
