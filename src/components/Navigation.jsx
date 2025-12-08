import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home", visible: true },
    { path: "/favorites", label: "My Recipes", visible: !!isAuthenticated },
    { path: "/preferences", label: "Preferences", visible: !!isAuthenticated },
    { path: "/about", label: "About", visible: true },
    { path: "/login", label: "Login", visible: !isAuthenticated },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-icon">🧑‍🍳</span>
          <span className="brand-text">SmartRecipe</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems
              .filter((item) => !!item.visible)
              .map((item) => (
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
            {isAuthenticated && (
              <NavDropdown
                title={user?.name || "User"}
                id="user-profile-dropdown"
                align="end"
              >
                <NavDropdown.ItemText
                  style={{ color: "var(--color-warm-brown)", fontSize: "15px" }}
                >
                  {user?.email}
                </NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Button}
                  variant="outline-light"
                  onClick={handleLogout}
                  style={{
                    color: "var(--color-warm-brown)",
                    fontSize: "15px",
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
