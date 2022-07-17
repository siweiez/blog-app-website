import React, { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")!) : null,
  isFetching: false,
  error: false
};

// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
export const Context = createContext<{
  state: {user: any, isFetching: boolean, error: boolean},
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
});

export const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider value={{ state: state, dispatch }} >
      {children}
    </Context.Provider>
  );
};