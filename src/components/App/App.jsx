import React from "react";
import "./App.css";
import Header from "../Header/Header.jsx";

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className={!open ? "overlay" : "overlay_active"} />
      <Header open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
