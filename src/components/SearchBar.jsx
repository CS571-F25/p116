import { Form } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder,
}) {
  return (
    <div className="search-bar-container mb-4 mx-auto">
      <IoSearch className="search-bar-icon" />
      <Form.Control
        type="search"
        aria-label="Search"
        placeholder={placeholder || "Search recipes..."}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar-input"
      />
    </div>
  );
}
