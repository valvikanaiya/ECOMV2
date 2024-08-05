/* eslint-disable */
import axios from "axios";
import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";

//  initial state
const initialState = {
  user: null,
  products: [],
  cart: [],
  authType: null,
  userSetting: null,
};

// Define actions
const ACTIONS = {
  SET_USER: "SET_USER",
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  CHANGE_QUANTITY: "CHANGE_QUANTITY",
  SET_AUTHTYPE: "SET_AUTHTYPE",
  SET_USER_SETTING: "SET_USER_SETTING",
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
    case ACTIONS.SET_AUTHTYPE: {
      return {
        ...state,
        authType: action.payload,
      };
    }
    case ACTIONS.SET_USER_SETTING: {
      return {
        ...state,
        userSetting: action.payload,
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
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setExchangeRates(response.data.rates);
    };
    fetchExchangeRates();
  }, []);

  return (
    <ECommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </ECommerceContext.Provider>
  );
};

export const useECommerceContext = () => {
  return useContext(ECommerceContext);
};
