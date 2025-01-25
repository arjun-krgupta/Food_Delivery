import React,{ createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  user: null,
  token: null,
  menuItems: [],
  cart: [],
  orderHistory: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "SET_MENU_ITEMS":
      return { ...state, menuItems: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case "PLACE_ORDER":
      return {
        ...state,
        orderHistory: [...state.orderHistory, action.payload],
        cart: [],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
