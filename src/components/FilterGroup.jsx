import { Form } from "react-bootstrap";

export default function FilterGroup({
  category,
  label,
  icon,
  options,
  selectedValues = [],
  onChange,
}) {
  return (
    <Form.Group className="mb-5">
      <Form.Label className="h5 mb-3" style={{ color: "var(--color-primary)" }}>
        {icon && <span className="me-2">{icon}</span>}
        {label}
      </Form.Label>
      <div className="filter-group">
        {options.map((option) => (
          <Form.Check
            key={option}
            type="checkbox"
            id={`${category}-${option}`}
            label={option}
            checked={selectedValues.includes(option)}
            onChange={() => onChange(category, option)}
            className="preference-checkbox"
          />
        ))}
      </div>
    </Form.Group>
  );
}
