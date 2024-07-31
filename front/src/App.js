import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./route/Router";
import { ContextProvider } from "./app/context/ContextProvider";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <ContextProvider> 
      <ToastContainer/>
      <RouterProvider router={router} />{" "}
    </ContextProvider>
  );
}

export default App;
