import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Material-Ui
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/styles';
// import PropTypes from 'prop-types';

const theme = createMuiTheme({themeFile});

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  // const { classes } = styles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={ home } />
            <AuthRoute exact path="/login" component={ login } authenticated={authenticated} />
            <AuthRoute exact path="/signup" component={ signup } authenticated={authenticated} />
          </Switch>
        </Router>
      </div>
      </MuiThemeProvider>
  );
}

// App.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default App;
// export default withStyles(styles)(App);
