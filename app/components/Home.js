import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';

import Stories from './Stories';
import User from './User';
import Post from './Post';
import { ThemeContext } from '../context/theme';

export default function Home() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div className={theme}>
          <div className="container">
            <Router>
              <nav className="space-between">
                <ul className="nav-bar">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      exact
                      to="/"
                    >
                      Top
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/new">
                      New
                    </NavLink>
                  </li>
                </ul>
                <button className="btn-clear" onClick={() => toggleTheme()}>
                  {theme === 'light' ? '🔦' : '💡'}
                </button>
              </nav>
              <Switch>
                <Route
                  key="/"
                  exact
                  path="/"
                  render={props => <Stories {...props} />}
                />
                <Route
                  key="/new"
                  exact
                  path="/new"
                  render={props => <Stories category="new" {...props} />}
                />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
