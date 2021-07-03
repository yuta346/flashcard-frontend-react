
import React from "react";
import {Link} from "react-router-dom"
import { AppBar, Tabs, Toolbar, Tab, Button, IconButton } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
            
            {/* <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}> */}
            {/* <MenuIcon /> */}
          
            {/* </IconButton> */}
            <div>
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
                                    label="AllFlashcards" 
                                    component={Link} to="/allflashcards"
                          >
                            All CARDS
                          </MenuItem>
                          <MenuItem onClick={handleClose} 
                                    label="RandomFlashcards" 
                                    component={Link} to="/randomflashcards"
                          >
                           GENERATE RANDOM CARDS
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Button color="inherit" label="Account" component={Link} to="/account">Account</Button>
              <Button color="inherit" label="Signup" component={Link} to="/signup">Sign up</Button>
            </div>
          </Toolbar>
    </AppBar>
  </div>)
}

export default Navbar;
