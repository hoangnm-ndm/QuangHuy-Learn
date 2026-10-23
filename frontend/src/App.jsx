import "./App.css";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";
import Counter from "./features/counter/Counter";

function App() {
  // * logic
  return (
    <>
      {/* <AppRoute /> */}
      <Counter />
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
