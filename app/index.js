import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stories from './components/Stories';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => (
  <Router>
    <Link to="/">Top</Link>
    <Link to="/new">New</Link>
    <Switch>
      <Route key="top" exact path="/" render={props => <Stories {...props} />} />
      <Route key="new" exact path="/new" render={props => <Stories {...props} category="new" />} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);