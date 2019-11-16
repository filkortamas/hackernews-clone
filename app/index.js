import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';

import './index.css';

import { ThemeContext } from './context/theme';
import Home from './components/Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }));
      }
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Home />
      </ThemeContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
