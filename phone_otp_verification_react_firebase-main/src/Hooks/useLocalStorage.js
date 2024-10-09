import { useCallback, useEffect, useState } from "react";

// Helper function to resolve initial value (in case it's a function)
const resolveValueOrFunction = (value) => {
  return typeof value === "function" ? value() : value;
};

// Dispatch custom event for localStorage changes
const dispatchLocalStorageEvent = (key, value) => {
  const event = new CustomEvent("localStorageChange", {
    detail: { key, value },
  });
  window.dispatchEvent(event);
};

// Custom hook to use localStorage dynamically
const useLocalStorage = (key, initialValue) => {
  // State to store the current value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : resolveValueOrFunction(initialValue);
    } catch (error) {
      console.error("Error reading localStorage key:", error);
      return resolveValueOrFunction(initialValue);
    }
  });

  // UseEffect to listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key || event.detail?.key === key) {
        const newValue = event.detail
          ? event.detail.value
          : JSON.parse(localStorage.getItem(key));
        setStoredValue(newValue);
      }
    };

    // Listen to the custom event and the native storage event
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, [key]);

  // Function to set new value in both state and localStorage
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = resolveValueOrFunction(value);
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
        dispatchLocalStorageEvent(key, valueToStore); // Notify all components
      } catch (error) {
        console.error("Error setting localStorage key:", error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
