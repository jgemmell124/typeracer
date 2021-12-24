
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Profile } from "./Components/Profile";
import { LogIn } from "./Components/LogIn";
import { LogOut } from "./Components/Logout";
import { NotFound } from "./Components/NotFound";
import Racer from "./Components/Racer";
import { BrowserRouter as Router, Route, Link, Redirect, Routes, useHistory} from "react-router-dom";




function App() {
  // const history = useHistory();

  return (
    <div>
    
      <Router >
        <Header />
        <Routes>
          <Route exact path="/" element={<Racer />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/logout" element={<LogOut />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
      <Footer />
      
    </div>

  );
}

export default App;
