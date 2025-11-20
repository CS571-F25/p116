import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/saved", label: "Saved Recipes" },
    { path: "/about", label: "About" },
  ];

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-icon">🧑‍🍳</span>
          <span className="brand-text">SmartRecipe</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname === "")
                    ? "active"
                    : ""
                }
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
