
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


const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:"#0F5298",
        
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));
  

const Navbar = () => {
  const {auth, setAuth} = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const logout = () => {
    sessionStorage.removeItem("session_id")
    setAuth(null)
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
            {auth ? <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit" 
              >
                FLASHCARDS
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose} 
                                    label="Quiz" 
                                    component={Link} to="/quiz"
                          >
                            Quiz
                          </MenuItem>
                          <MenuItem onClick={handleClose} 
                                    label="Study" 
                                    component={Link} to="/study"
                          >
                            Study
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
              <Button color="inherit" label="Account" component={Link} to="/account">Account</Button>
              <Button onClick={logout} color="inherit" label="Logout" component={Link} to="/">Logout</Button>
              </div>:
            <div>
              <Button color="inherit" label="Signup" component={Link} to="/signup">Sign up</Button>
              <Button color="inherit" label="Login" component={Link} to="/login">Login</Button>
            </div>}
          </Toolbar>
    </AppBar>
  </div>)
}

export default Navbar;
