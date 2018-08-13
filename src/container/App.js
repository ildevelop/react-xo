import React, { Component } from 'react';
import './App.css';
import GameComponent from "../components/GameComponent";
import {Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from "reactstrap";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar color="dark" expand="md">
          <NavbarBrand href="/">NEW GAMES</NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://www.linkedin.com/in/ilya-radu-0770b5b8/">linkedin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/ildevelop/react-xo">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      <GameComponent/>
      </div>
    );
  }
}

export default App;
