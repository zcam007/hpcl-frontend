import "./App.css";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
// import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
// import useToken from "./userToken";

function App() {
  // const token = getToken();
  // const [token, setToken] = useState();
  // const { token, setToken } = useToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <div className="App">
      <div className="wrapper">
        {/* <h1>Application</h1> */}
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
