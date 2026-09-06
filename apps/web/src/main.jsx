import { createRoot } from "react-dom/client";
import AppShell from "./App.jsx";
import "./tailwind.css";
import "./styles.css";
import "./production-editorial.css";
import "./stitch-refinement-v4.css";
import "./stitch-admin-experience.css";
import "./home-media-experience.css";
import "./urban-stitch-pages.css";

createRoot(document.getElementById("root")).render(<AppShell />);
