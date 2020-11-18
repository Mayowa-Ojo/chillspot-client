import { GlobalStyles } from "twin.macro";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";

import { Home, Stories, Login, Signup, Story, NotFound } from "./containers";
import { Navbar, ModalWrapper } from "./components";

function App() {
   const modalComponents = {
      story: Story
   }

   // NOTE: current-modal value will be fetched from global state
   const CurrentModal = modalComponents["story"];

   return (
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

         <ModalWrapper>
            {<CurrentModal />}
         </ModalWrapper>
      </Router>
   );
}

export default App;
