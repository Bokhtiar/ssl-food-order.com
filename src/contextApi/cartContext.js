// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Define initial state
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('carts')) || [],
};

// Create the context
const CartContext = createContext();

// Create the reducer
const cartReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':

            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],

            };
        // Add other cases as needed
        default:
            return state;
    }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        const itemCart = {...item, qty:1}
        var cartProducts = JSON.parse(localStorage.getItem('carts')) || []
        cartProducts.push(itemCart);
        console.log(cartProducts);
        localStorage.setItem("carts", JSON.stringify(cartProducts));

        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    return (
        <CartContext.Provider value={{ state, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Create a custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};