import "./App.css";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from "react-toastify";

function App() {
  // * logic
  return (
    <>
      <AppRoute />
      <ToastContainer />
    </>
  );
}

export default App;
