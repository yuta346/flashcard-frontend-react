import {useState} from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Singup";
import AllFlashCards from "./components/AllFlashCards";
import RamdomFlashCards from "./components/RandomFlashCards";
import {AuthContext} from "./AuthContext";


function App() {

  const [auth, setAuth] = useState({"username":null, "session_id":null})


  return (
    <div className="App">
    
    <Router>
    <Switch>
    <AuthContext.Provider value={{auth, setAuth}}>  
        <Navbar/>
        <Route path="/" exact component={Landing}/>
        <Route path="/allflashcards" exact component={AllFlashCards}/>
        <Route path="/randomflashcards" exact component={RamdomFlashCards}/>
        <Route path="/account" exact/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
      </AuthContext.Provider>
    </Switch>
    </Router>
      
    </div>
  );
}

export default App;
