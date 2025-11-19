import { Container, Flex, Text } from "@radix-ui/themes";
import { Link, useLocation } from "react-router";

// Common class utilities
const navBorderGradient =
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-linear-to-r after:from-(--orange-9) after:to-(--orange-10)";
const brandGradientText =
  "bg-linear-to-br from-(--orange-9) to-(--orange-10) bg-clip-text text-transparent";
const linkBase =
  "px-4 py-2 rounded-lg font-medium transition-all relative no-underline";
const linkActive =
  "text-(--orange-9) bg-(--orange-a8) font-semibold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60%] after:h-[3px] after:bg-linear-to-r after:from-(--orange-9) after:to-(--orange-10) after:rounded-t";
const linkInactive =
  "text-(--sand-11) hover:text-(--orange-9) hover:bg-(--orange-a5)";

export default function Navigation() {
  const location = useLocation();
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "";
    }
    return location.pathname === path;
  };

  return (
    <nav
      className={`bg-white shadow-[0_2px_12px_rgba(92,64,51,0.08)] py-4 relative ${navBorderGradient}`}
    >
      <Container size="4">
        <Flex justify="between" align="center" className="flex-wrap gap-4">
          <Link
            to="/"
            className="text-2xl font-bold text-(--sand-11) no-underline flex items-center gap-2 transition-transform hover:scale-105 hover:text-(--orange-9)"
          >
            <span className="text-[1.75rem]">🧑‍🍳</span>
            <span className={brandGradientText}>🧑SmartRecipe</span>
          </Link>
          <Flex gap="4" align="center" className="flex-wrap">
            <Link
              to="/"
              className={`${linkBase} ${
                isActive("/") ? linkActive : linkInactive
              }`}
            >
              Home
            </Link>
            <Link
              to="/saved"
              className={`${linkBase} ${
                isActive("/saved") ? linkActive : linkInactive
              }`}
            >
              Saved Recipes
            </Link>
            <Link
              to="/about"
              className={`${linkBase} ${
                isActive("/about") ? linkActive : linkInactive
              }`}
            >
              About
            </Link>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
}
