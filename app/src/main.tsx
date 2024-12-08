import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./services/store";
import App from "./App";
import '../src/config/i18n'; // Import i18n configuration
import store from '../src/Components/Test/redux/store'; // Import the Redux store

// Use createRoot for React 18 and above
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* Wrap App with the Redux Provider to pass down the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
