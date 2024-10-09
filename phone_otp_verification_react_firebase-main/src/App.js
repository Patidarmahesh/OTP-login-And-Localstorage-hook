import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import About from "./Pages/About";
import ProtectedRoute from "./Components/ProtectedRoute";
import useLocalStorage from "./Hooks/useLocalStorage";
import MultipleFormStepper from "./Pages/MultipleFormStepper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "/formstepper",
    element: <MultipleFormStepper />,
  },
  {
    path: "/login",
    element: <LoginSignup />,
  },
]);

const App = () => {
  const [storedValue, setValue] = useLocalStorage("mahesh");
  return (
    <section className="bg-red-300 w-full h-screen">
      {/* <button
        onClick={() => setValue()}
        className="text-white bg-green-500 cursor-pointer p-4 my-3 mx-3"
      >
        Remove localStorage value
      </button>
      <h1>{"storedValue?.name" + " => " + storedValue?.name}</h1> */}
      <RouterProvider router={router} />
    </section>
  );
};

export default App;
