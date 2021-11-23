import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogout } from "react-google-login";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UserIcon from "@material-ui/icons/AccountCircleRounded";

import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Menu, MenuItem, Grid } from "@material-ui/core";

import { toggleTheme } from "../actions/themeActions";
import { logout } from "../actions/authActions";

import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
  Container,
} from "@material-ui/core";

const Navbar = () => {
  const dispatch = useDispatch();

  const themeState = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { theme } = themeState;

  const useStyles = makeStyles({
    title: {
      flexGrow: 1,
    },
    navbar: {
      backgroundColor: theme == "light" ? "#132c33" : "#111",
      // transition: ".2s",
    },
    name: {},
    picture: {
      width: "50px",
      borderRadius: 50,
      marginRight: 10,
    },
    gridTop: {
      margin: "10px 0",
    },
    btn_logout: {
      margin: "10px 0",
    },
  });

  const classes = useStyles();

  useEffect(() => {
    if (!localStorage.theme) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={classes.navbar}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              MCQ Test
            </Typography>
            {!isAuthenticated && (
              <Button color="inherit" disableRipple href="/">
                Login
              </Button>
            )}

            {isAuthenticated && (
              <>
                <IconButton edge="start" color="inherit" onClick={handleMenu}>
                  <UserIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Grid container justify="center" alignItems="center">
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.gridTop}
                    >
                      <img src={user.picture} className={classes.picture} />
                      <h3 className={classes.name}>{user.name}</h3>
                    </Grid>
                    <Grid container justify="center">
                      <GoogleLogout
                        render={(renderProps) => (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => dispatch(logout())}
                            // disabled={renderProps.disabled}
                            className={classes.btn_logout}
                          >
                            Log Out
                          </Button>
                        )}
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Logout"
                        // onLogoutSuccess={handleClose}
                        // onClick={handleClose}
                      ></GoogleLogout>
                    </Grid>
                  </Grid>
                </Menu>
              </>
            )}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme == "light" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
