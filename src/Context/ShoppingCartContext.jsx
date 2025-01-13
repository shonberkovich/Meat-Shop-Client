import React, { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    return (
        <ShoppingCartContext.Provider value={{selectedProducts, setSelectedProducts}}>
            {children}
        </ShoppingCartContext.Provider>
    );
};