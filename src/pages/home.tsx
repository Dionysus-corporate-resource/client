import { NavLink } from "react-router";
import { Button } from "../shared/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-x-2">
      <span>HomePage</span>
      <Button>Click me</Button>
      <NavLink to="/login">login</NavLink>
      <NavLink to="/register">register</NavLink>
    </div>
  );
}
