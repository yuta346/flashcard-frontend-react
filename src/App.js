
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Signup from "./components/Singup";
import FlashCards from "./components/FlashCards"


function App() {
  return (
    <div className="App">
    
    <Router>
      <Navbar/>
      <Route path="/flashcards" component={FlashCards}/>
      <Route path="/account"/>
      <Route path="/signup" component={Signup}/>
    </Router>
      
    </div>
  );
}

export default App;
