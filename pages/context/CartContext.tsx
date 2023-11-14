// context/CartContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { useEffect } from 'react';

type CartItem = {
  id: string;
  bookId?: string;
  stationeryId?: string;
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
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_ITEMS', payload: CartItem[] }
  | { type: 'INCREMENT'; payload: { id: string } }
  | { type: 'DECREMENT'; payload: { id: string } }
  | { type: 'SET_QUANTITY'; payload: {id: number} };
  
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: { cartItems: [], cartTotal: 0 },
  dispatch: () => null,
});

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
        const newItem = {
          ...action.payload,
          quantity: 1,
          type: action.payload.bookId ? 'Book' : 'Stationery',
          bookId: action.payload.bookId ? action.payload.bookId : null,
          stationeryId: action.payload.stationeryId ? action.payload.stationeryId : null
        };
        console.log(newItem);
        updatedCartItems.push(newItem);
      }
      const newCartTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
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
      return {
        ...state,
        cartItems: [],
        cartTotal: 0
      };
      case 'INCREMENT': {
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        const newCartTotal = updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        return { ...state, cartItems: updatedCartItems, cartTotal: newCartTotal };
      }
      case 'DECREMENT': {
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        const newCartTotal = updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        return { ...state, cartItems: updatedCartItems, cartTotal: newCartTotal };
      }
      case 'SET_QUANTITY': {
        const updatedCartItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity,
            };
          }
          return item;
        });
        const newCartTotal = updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        return { ...state, cartItems: updatedCartItems, cartTotal: newCartTotal };
      }
    case 'SET_CART_TOTAL':
      return { ...state, cartTotal: action.payload };
    case 'LOAD_ITEMS': {
      return { ...state, cartItems: action.payload };
    }
    default:
      return state;
  }
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [], 
    cartTotal: 0,    
  });
  
  useEffect(() => {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      const parsedCartItems: CartItem[] = JSON.parse(cartFromStorage);
      dispatch({ type: 'LOAD_ITEMS', payload: parsedCartItems });
    }
  }, []);

  useEffect(() => {
    const newCartTotal = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    dispatch({ type: 'SET_CART_TOTAL', payload: newCartTotal });
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
