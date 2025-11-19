import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="custom-navbar" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-icon">🧑‍🍳</span>
          <span className="brand-text">SmartRecipe</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={
                location.pathname === "/" || location.pathname === ""
                  ? "active"
                  : ""
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/saved"
              className={location.pathname === "/saved" ? "active" : ""}
            >
              Saved Recipes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
