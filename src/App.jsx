import { useState, useEffect } from "react";
import { Header, SideMenu, TaskBoard } from "./layouts";
import { Context } from "./ContextApp";

function App() {
  const [data, setData] = useState();
  const [select, setSelect] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    if (data?.length >= 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  return (
    <Context.Provider value={{ data : data, setData, select, setSelect }}>
      <div className="bg-background-light flex h-screen w-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <SideMenu />
          <TaskBoard />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
