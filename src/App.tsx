import './styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostsPage from "./pages/PostsPage";
import About from "./pages/About";
import User from "./pages/User";
import PostView from "./pages/PostView";
import Register from './pages/Register';
import { useContext } from 'react';
import { Context } from './context/Context';
import CreatePage from './pages/CreatePage';

function App() {
  const { state } = useContext(Context);
  const user = state.user;

  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<PostsPage />} />
            <Route path='/login' element={user ? <Home /> : <Login />} />
            <Route path='/register' element={user ? <Login /> : <Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/user' element={user ? <User /> : <Home />} />
            <Route path='/create' element={user ? <CreatePage /> : <Home />} />
            <Route path='/post/:id' element={<PostView />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
