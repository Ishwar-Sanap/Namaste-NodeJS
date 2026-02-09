import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import appStore from "./store/appStore";
import {Provider} from "react-redux"
import Feed from "./components/Feed";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
