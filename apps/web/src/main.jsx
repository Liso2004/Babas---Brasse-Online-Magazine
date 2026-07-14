import { createRoot } from "react-dom/client";
import AppShell from "./App.jsx";
import "./tailwind.css";
import "./styles.css";
import "./production-editorial.css";
import "./stitch-refinement-v4.css";

createRoot(document.getElementById("root")).render(<AppShell />);
