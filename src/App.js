import {useState} from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Quiz from "./components/Quiz";
import Study from "./components/Study";
import CreateFlashCard from "./components/CreateFlashCard";
import CreateCustomFlashCard from "./components/CreateCustomFlashCard";
import ResultTable from "./components/ResultTable"
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
        <Route path="/quiz" exact component={Quiz}/>
        <Route path="/study" exact component={Study}/>
        <Route path="/create/custom_flashcard" exact component={CreateCustomFlashCard}/>
        <Route path="/create/flashcard" exact component={CreateFlashCard}/>
        <Route path="/account" exact/>
        <Route path="/result_table" exact component={ResultTable}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
      </AuthContext.Provider>
    </Switch>
    </Router>
      
    </div>
  );
}

export default App;
