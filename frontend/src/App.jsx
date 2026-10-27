import "./App.css";
import Counter from "./pages/common/Counter";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";

function App() {
  // * logic
  return (
    <>
      {/* <AppRoute /> */}
      <Counter />
      <ToastContainer />
    </>
  );
}

export default App;
