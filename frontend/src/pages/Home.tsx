import { Navbar } from "../components/home/Navbar";
import { TaskList } from "../components/home/TaskList";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TaskList />
    </div>
  );
};
