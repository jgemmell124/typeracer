
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Profile } from "./Components/Profile";
import { LogIn } from "./pages/LogIn";
import { LogOut } from "./pages/Logout";
import { NotFound } from "./pages/NotFound";
import { Users } from "./pages/Users";
import Racer from "./Components/Racer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


  


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
          <Route exact path="/users" element={<Users />} /> 
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
      <Footer />
      
    </div>

  );
}

export default App;
