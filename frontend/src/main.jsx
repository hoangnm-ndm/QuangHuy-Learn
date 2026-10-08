import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createElement } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// const appElement = document.getElementById("root");

// const virtualElement = createRoot(appElement);

// const MyElement = createElement(
//   ["div", "h1"],
//   {
//     title: "abc",
//     style: { backgroundColor: "red" },
//   },
//   createElement("h1", "Noi dung the h1"),
// );

// JSX;
// function MyElement() {
//   // * logic
//   return (
//     <MyElement title="abc">
//       <h1>Noi dung the h1</h1>
//     </MyElement>
//   );
// }

// HTML DOM Tree
// Document Object Model = Mô hình hoá tài liệu thành đối tượng

// virtualElement.render(<MyElement />);
