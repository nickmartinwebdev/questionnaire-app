import { useState } from "react";
import { Button } from "@mantine/core";
import { Outlet } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button onClick={() => setCount((count) => count + 1)}>Web app</Button>
      <div>{count}</div>
      <Outlet />
    </div>
  );
}

export default App;
