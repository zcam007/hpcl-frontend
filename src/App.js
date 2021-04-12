import "./App.css";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
// import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav } from "react-bootstrap";

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
<Navbar expand="lg" style={{marginBottom:'20px'}}  bg="primary" variant="dark">
  <Navbar.Brand href="/">AC Data</Navbar.Brand>
  <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/admin">Admin</Nav.Link>
    </Nav>
</Navbar>
        <BrowserRouter>
          <Switch>
              {/* <Dashboard /> */}
            {/* </Route> */}
            <Route path="/admin" component={Admin}/>
            <Route path="/" component={Dashboard}/>

          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
