import { Link } from "react-router-dom";
import { ModeToggle } from "./mode.toggle";

export function Header() {
  return (
    <header className="p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <h1 className="font-bold text-xl">Where in the world?</h1>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
