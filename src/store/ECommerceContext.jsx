/* eslint-disable */
import { createContext, useReducer, useContext } from "react";

//  initial state
const initialState = {
  user: null,
  products: [],
  cart: [],
};

// Define actions
const ACTIONS = {
  SET_USER: "SET_USER",
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  CHANGE_QUANTITY: "CHANGE_QUANTITY",
};

// Create a reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ACTIONS.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.CLEAR_CART:
      return { ...state, cart: [] };
    case ACTIONS.CHANGE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : { ...item }
        ),
      };
    }
    default:
      return state;
  }
};

// Create Context
const ECommerceContext = createContext();

// Create a Provider component
export const ECommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ECommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </ECommerceContext.Provider>
  );
};

export const useECommerceContext = () => {
  return useContext(ECommerceContext);
};
