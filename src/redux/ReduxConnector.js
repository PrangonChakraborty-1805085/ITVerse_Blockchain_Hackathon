"use client";
import { ReduxProvider } from "./provider";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor, store } from "./store"; // Importing  Redux store
function ReduxConnector({ Children }) {
  return (
    <ReduxProvider>
      {Children}
    </ReduxProvider>
  );
}

export default ReduxConnector;
