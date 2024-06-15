import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Navbar } from "./Components/Navbar/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./style.css";
import { Navigator } from "./Components/Navigation/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Navbar />
		<Navigator />
		<App />
	</BrowserRouter>
);
