import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Material-Ui
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#673ab7'
        },
        secondary: {
            main: '#ff9100'
        }
      }
});

function App() {
  return (
    <MuiThemeProvider theme={ theme }>
      <div className="App">
        <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={ home } />
            <Route exact path="/login" component={ login } />
            <Route exact path="/signup" component={ signup } />
          </Switch>
        </Router>
      </div>
      </MuiThemeProvider>
  );
}

export default App;
