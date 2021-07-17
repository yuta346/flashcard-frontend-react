import {useState} from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Quiz from "./components/Quiz";
import Study from "./components/Study";
import StudyTop from "./components/StudyTop";
import StudyExit from "./components/StudyExit"
import CreateFlashCard from "./components/CreateFlashCard";
import CreateCustomFlashCard from "./components/CreateCustomFlashCard";
import Account from "./components/Account";
import ResultTable from "./components/ResultTable"
import QuizResultTable from "./components/QuizResultTable";
import {AuthContext} from "./AuthContext";


function App() {

  const [auth, setAuth] = useState(sessionStorage.getItem("session_id"))

  if (auth){
    return (<div className="App">
              <Router>
              <Switch>
                <AuthContext.Provider value={{auth:auth, setAuth:setAuth}}>  
                <Navbar/>
                  <Route path="/quiz" exact component={Quiz}/>
                  <Route path="/study/top" exact component={StudyTop}/>
                  <Route path="/study" exact component={Study}/>
                  <Route path="/study/exit" exact component={StudyExit}/>
                  <Route path="/create/custom_flashcard" exact component={CreateCustomFlashCard}/>
                  <Route path="/create/flashcard" exact component={CreateFlashCard}/>
                  <Route path="/account" exact component={Account}/>
                  <Route path="/quiz/result" exact component={ResultTable}/>
                  {/* <Route path="/quiz/result" exact component={QuizResultTable}/> */}
                  </AuthContext.Provider>
            </Switch>
            </Router>
            </div>
    )}else{
      return (<div className="App">
                <Router>
                <Switch>
                  <AuthContext.Provider value={{auth:auth, setAuth:setAuth}}> 
                  <Navbar/>
                    <Route path="/" exact component={Signup}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={Signup}/>
                  </AuthContext.Provider>
                </Switch>
                </Router>
            </div>

      )
    }
  }

  // return (
  //   <div className="App">
  //   <Router>
  //   <Switch>
  //   <AuthContext.Provider value={{auth:auth, setAuth:setAuth}}>  
  //       <Navbar/>
  //       <Route path="/" exact component={Landing}/>
  //       <Route path="/quiz" exact component={Quiz}/>
  //       <Route path="/study" exact component={Study}/>
  //       <Route path="/create/custom_flashcard" exact component={CreateCustomFlashCard}/>
  //       <Route path="/create/flashcard" exact component={CreateFlashCard}/>
  //       <Route path="/account" exact component={Account}/>
  //       <Route path="/result_table" exact component={ResultTable}/>
  //       <Route path="/login" exact component={Login}/>
  //       <Route path="/signup" exact component={Signup}/>
  //     </AuthContext.Provider>
  //   </Switch>
  //   </Router>
      
  //   </div>
  // );
// }

export default App;
