import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";


function Application() {
    return (<h1>Hello bithc</h1>)
}

const container = document.getElementById("app")
const root = createRoot(container);
root.render(<Application/>)