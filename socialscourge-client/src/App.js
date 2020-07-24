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
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/styles';
// import PropTypes from 'prop-types';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#673ab7'
        },
        secondary: {
            main: '#ff9100'
        }
      },
      typography: {
        useNextVariants: true
      },
      paper: {
        textAlign: 'center',
        color: "yellow",
      },
      spacing: 4,
});

// const styles = theme => ({
//   palette: {
//     primary: {
//       main: '#673ab7',
//     },
//     secondary: {
//       main: '#ff9100'
//     }
//   },
//   root: {
//     flexGrow: 1,
//   },
  // paper: {
  //   padding: "10em",
  //   textAlign: 'center',
  //   color: "yellow",
  // },
// });

function App() {
  // const { classes } = styles();
  return (
    <MuiThemeProvider theme={theme}>
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

// App.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default App;
// export default withStyles(styles)(App);
