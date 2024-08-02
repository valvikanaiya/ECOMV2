import { useECommerceContext } from "../store/ECommerceContext";

export const useECommerce = () => {
  const { state, dispatch } = useECommerceContext();

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  const setAuthType = (AuthType) => {
    dispatch({ type: "SET_AUTHTYPE", payload: AuthType });
  };

  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const changeQuantity = (id, quantity) => {
    dispatch({ type: "CHANGE_QUANTITY", payload: { id, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const placeOrder = (order) => {
    dispatch({ type: "PLACE_ORDER", payload: order });
  };

  return {
    state,
    setUser,
    setProducts,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    setAuthType,
  };
};
