import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from './Main';
import Comments from './components/comments/Comments';

function Navigation() {
  return (
    // This is where the routing logic is handled
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/comments" component={Comments} />
        </Switch>
      </div>
    </Router>
  );
}

export default Navigation;