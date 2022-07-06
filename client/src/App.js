import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import DetailPost from "./components/detailPost/DetailPost";
import SettingsPage from "./components/settingsPage/SettingsPage";
import Login from "./components/login/Login"
import Register from "./components/register/Register";
import NewPost from "./components/newPost/Newpost";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post/:postId" element={<DetailPost />} />
        <Route exact path="/settings" element={user ? <SettingsPage /> : <Register />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/register" element={user ? <Home /> : <Register />} />
        <Route exact path="/write" element={user ? <NewPost /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
