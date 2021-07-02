
import React from "react";
import {Link} from "react-router-dom"
import { AppBar, Tabs, Toolbar, Tab, Button, IconButton } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:"#0F5298"
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

    return (
    <div>
    <AppBar position="static" className={classes.root}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>Flashcard App</Typography>
            <Button  color="inherit" label="Flashcards" component={Link} to="/flashcards">Flashcards</Button>
            <Button color="inherit" label="Account" component={Link} to="/account">Account</Button>
        </Toolbar>
</AppBar>
  </div>)
}

export default Navbar;
