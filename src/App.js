
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Profile } from "./pages/Profile";
import { LogIn } from "./pages/LogIn";
import { LogOut } from "./pages/Logout";
import { NotFound } from "./pages/NotFound";
import { Users } from "./pages/Users";
import { SignUp } from "./pages/SignUp";
import Racer from "./Components/Racer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute"
import { AuthProvider } from "./utils/AuthProvider"
  


function App() {

  return (
    <div>
    
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Racer />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            {/* <Route exact path="/profile" element={<Profile />} /> */}
            <Route exact path="/logout" element={<LogOut />} />
            <Route exact path="/users" element={<Users />} /> 
            <Route exact path="/signup" element={<SignUp />} /> 
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </AuthProvider>
      </Router>
      <Footer />
      
    </div>

  );
}

export default App;
