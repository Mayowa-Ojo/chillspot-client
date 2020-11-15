import { GlobalStyles } from "twin.macro";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";

import { Home, Login, NotFound } from "./containers";
import { Navbar } from "./components";

function App() {
   return (
      <Router>
         <GlobalStyles />
         <Navbar />

         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="*" component={NotFound}></Route>
         </Switch>
      </Router>
   );
}

export default App;
