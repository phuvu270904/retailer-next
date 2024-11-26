/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const AppContext = createContext({
    showCart: true,
    setShowCart: (show: boolean) => {},
  });
  