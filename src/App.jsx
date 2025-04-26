import { Header, SideMenu, TaskBoard } from "./layouts";

function App() {
  return (
    <div className="bg-background-light flex h-screen w-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <TaskBoard />
      </div>
    </div>
  );
}

export default App;
