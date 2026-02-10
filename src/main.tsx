import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
flushSync(() => {
  root.render(<App />);
});

// Scroll to hash target while content is invisible (visibility:hidden preserves
// layout so offsetTop and scrollTo work). Reveal only after scroll is set.
const hash = window.location.hash.slice(1);
if (hash) {
  const el = document.getElementById(hash);
  if (el) window.scrollTo(0, el.offsetTop);
}
document.documentElement.classList.remove('hash-pending');
