import { useState } from "react";
import { Header, SideMenu, TaskBoard } from "./layouts";
import dataTask from "./data.json" ;

function App() {
  const [data, setData] = useState(dataTask || []);
  const [select, setSelect] = useState(0);
  return (
    <div className="bg-background-light flex h-screen w-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <SideMenu data={data} select={select} setSelect={setSelect} />
        <TaskBoard data={data} select={select} />
      </div>
    </div>
  );
}

export default App;
