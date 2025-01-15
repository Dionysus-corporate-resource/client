import { NavLink } from "react-router";

export default function HomePage() {
  return (
    <div className="space-x-2">
      <span>HomePage</span>
      <NavLink to="/login">login</NavLink>
      <NavLink to="/register">register</NavLink>
    </div>
  );
}
