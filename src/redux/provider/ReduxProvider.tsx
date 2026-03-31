"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";

interface PageProps {
  children: ReactNode;
}

/**
 * Redux Provider with SSR support
 * Handles redux-persist localStorage initialization on client-side only
 */
export default function ReduxProvider({ children }: PageProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client-side to avoid localStorage issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}