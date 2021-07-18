
import React, {useContext} from "react";
import {Link} from "react-router-dom"
import { AuthContext } from "../AuthContext";
import { AppBar, Toolbar, Button,} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    root:{
        // backgroundColor:"#0F5298",
      background: 'linear-gradient(45deg, #0F5298 30%, #0d8aee 100%)',
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
      marginLeft:30,
      fontSize:"1.4rem",
      fontFamily:"Helvetica Neue"
    },
    NotificationsNoneIcon:{
     color: 'inherit',
    }
  }));
  

const Navbar = () => {
  const {auth, setAuth} = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const logout = () => {
    sessionStorage.removeItem("session_id")
    setAuth("")
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

    return (
    <div>
    <AppBar position="static" className={classes.root}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>Flashcard App</Typography>
            {auth? 
                <div>

                  <Button color="inherit" 
                          label="Account" 
                          component={Link} 
                          to="/account"　
                          style={{fontSize:"1rem",fontFamily:"Helvetica Neue",marginRight:"5px"}}
                  >
                    Dashboard
                  </Button>

                  <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit" 
                    style={{fontSize:"1rem", fontFamily:"Helvetica Neue"}}
                  >
                    FLASHCARDS
                  </Button>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper style={{marginLeft:"200px"}}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} 
                                      id="menu-list-grow" 
                                      onKeyDown={handleListKeyDown}
                                      style={{fontSize:"2rem"}}
                            >
                              <MenuItem onClick={handleClose} 
                                        label="StudyTop" 
                                        component={Link} to="/study/top"
                              >
                                Study
                              </MenuItem>
                              <MenuItem onClick={handleClose} 
                                        label="Quiz" 
                                        component={Link} to="/quiz"
                              >
                                Quiz
                              </MenuItem>
                              
                              <MenuItem onClick={handleClose} 
                                        label="CreateFlashCard" 
                                        component={Link} to="/create/custom_flashcard"
                              >
                              Create Custom Flash Card
                              </MenuItem>
                              <MenuItem onClick={handleClose} 
                                        label="CreateFlashCard" 
                                        component={Link} to="/create/flashcard"
                              >
                              Create Flash Card
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                  <IconButton 
                              color="inherit"
                              component={Link}  
                              to="/pending/words"  
                  >
                    {/* <Badge badgeContent={} color="secondary"> */}
                      <NotificationsIcon />
                    {/* </Badge> */}
                  </IconButton>
                
                  <Button onClick={logout} 
                          color="inherit" 
                          label="Logout" 
                          component={Link} 
                          to="/" 
                          style={{fontSize:"1rem",fontFamily:"Helvetica Neue"}}
                  >
                    Logout
                  </Button>
                  </div>
                  :
                <div>
                  <Button color="inherit" 
                          label="Signup" 
                          component={Link} 
                          to="/signup"
                          style={{fontSize:"1rem",fontFamily:"Helvetica Neue"}}
                  >
                    Sign up
                  </Button>
                  <Button color="inherit" 
                          label="Login" 
                          component={Link} 
                          to="/login"　
                          style={{fontSize:"1rem",fontFamily:"Helvetica Neue", marginRight:10}}
                  >
                    Login
                  </Button>
            </div>}
          </Toolbar>
    </AppBar>
  </div>)
}

export default Navbar;
