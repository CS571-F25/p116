import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import {
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiOutlineCube,
  HiOutlineUserCircle,
  HiOutlineViewGrid,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home", visible: true, icon: <HiOutlineHome /> },
    {
      path: "/explore",
      label: "Explore",
      visible: true,
      icon: <HiOutlineGlobeAlt />,
    },
    {
      path: "/favorites",
      label: "My Recipes",
      visible: !!isAuthenticated,
      icon: <HiOutlineCube />,
    },
    {
      path: "/preferences",
      label: "Preferences",
      visible: !!isAuthenticated,
      icon: <HiOutlineViewGrid />,
    },
    {
      path: "/about",
      label: "About",
      visible: true,
      icon: <HiOutlineInformationCircle />,
    },
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
              .map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname === "");
                return (
                  <Nav.Link
                    key={item.path}
                    as={Link}
                    to={item.path}
                    className={`${isActive ? "active" : ""}`}
                  >
                    {item.icon && <span className="nav-icon">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Nav.Link>
                );
              })}
            {isAuthenticated && (
              <NavDropdown
                title={
                  <>
                    <span className="nav-icon">
                      <HiOutlineUserCircle />
                    </span>{" "}
                    {user?.name || "User"}
                  </>
                }
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
                  <LogoutIcon style={{ marginRight: 2 }} /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
