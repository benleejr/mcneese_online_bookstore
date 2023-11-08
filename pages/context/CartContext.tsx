// context/CartContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Type definitions for cart items and cart actions
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  cartTotal: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'SET_CART_TOTAL'; payload: number }
  // Add other action types here
  | { type: 'CLEAR_CART' }
  | { type: 'INCREMENT'; payload: { id: string } }
  | { type: 'DECREMENT'; payload: { id: string } };
  

// Create the cart context with a default value
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: { cartItems: [], cartTotal: 0 },
  dispatch: () => null,
});

// Reducer function for managing cart state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedCartItems = [...state.cartItems];
      if (existingCartItemIndex !== -1) {
        const existingCartItem = updatedCartItems[existingCartItemIndex];
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        };
        updatedCartItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedCartItems.push({ ...action.payload, quantity: 1 });
      }
      const newCartTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      return { ...state, cartItems: updatedCartItems, cartTotal: newCartTotal };
    }
    case 'REMOVE_ITEM': {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const newCartTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      return { ...state, cartItems: updatedCartItems, cartTotal: newCartTotal };
    }
    case 'CLEAR_CART':
      // Implement the logic for CLEAR_CART
      return {
        ...state,
        cartItems: [],
        cartTotal: 0
      };
    case 'INCREMENT':
      // Implement the logic for INCREMENT
      return state; // Placeholder, replace with actual logic
    case 'DECREMENT':
      // Implement the logic for DECREMENT
      return state; // Placeholder, replace with actual logic
    case 'SET_CART_TOTAL':
      return { ...state, cartTotal: action.payload };
    default:
      return state;
  }
};

// Define the CartProvider props
type CartProviderProps = {
  children: ReactNode;
};

// Create a provider for the cart
export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [], // Initialize from local storage
    cartTotal: 0,    
  });
  
  useEffect(() => {
    // Load cart items from local storage on the client side
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      // Parse the cart items and dispatch an action to update the state
      dispatch({ type: 'LOAD_ITEMS', payload: JSON.parse(cartFromStorage) });
    }
  }, []); // Empty array ensures this effect runs once on mount

  useEffect(() => {
    // Calculate the new cart total whenever cartItems change
    const newCartTotal = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    dispatch({ type: 'SET_CART_TOTAL', payload: newCartTotal });

    // Update local storage with the new state of cartItems
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);


  // The value prop expects an object with state and dispatch
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
