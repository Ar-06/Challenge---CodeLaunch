import { useAuth } from "../../context/auth/useAuth";
import { Button } from "../ui/button";

export const Navbar = () => {
  const { initialUsers, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-foreground">TaskNotes</h1>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-foregroundS">
            {user?.username}
          </span>
          <Button className="relative h-10 w-10 rounded-full border-b bg-gradient-to-r from-blue-600 to-indigo-600 font-bold hover:from-blue-700 to hover:to-indigo-700">
            {initialUsers()}
          </Button>
        </div>
      </div>
    </nav>
  );
};
