
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Signup from "./components/Singup";
import AllFlashCards from "./components/AllFlashCards";
import RamdomFlashCards from "./components/RandomFlashCards";


function App() {
  return (
    <div className="App">
    
    <Router>
      <Navbar/>
      <Route path="/allflashcards" component={AllFlashCards}/>
      <Route path="/randomflashcards" component={RamdomFlashCards}/>
      <Route path="/account"/>
      <Route path="/signup" component={Signup}/>
    </Router>
      
    </div>
  );
}

export default App;
