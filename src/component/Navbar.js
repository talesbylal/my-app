import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  navButton: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('jwtToken');

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} component={Link} to="/">
              TODOs
            </Typography>
            <NavLink to="/dashboard" >
              <Button className={classes.navButton}>Dashboard</Button>
            </NavLink>
            {isAuthenticated ? (
              <Button className={classes.navButton} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <NavLink to="/login" >
                  <Button className={classes.navButton}>Login</Button>
                </NavLink>
                <NavLink to="/register" >
                  <Button className={classes.navButton}>Register</Button>
                </NavLink>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};

export default Navbar;
