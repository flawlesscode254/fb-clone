import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Group from './Group';
import Comments from './Comments';

function Main() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Group} />
          <Route path="/comments" component={Comments} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;