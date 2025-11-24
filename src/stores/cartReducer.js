import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { pizzaId, name, unitPrice } = action.payload;
      if (state.find((pizza) => pizza.pizzaId === pizzaId)) return;
      const totalPrice = unitPrice;
      const pizza = { pizzaId, name, unitPrice, quantity: 1, totalPrice };

      state.push(pizza);
    },

    removeFromCart: (state, action) => {
      const { pizzaId } = action.payload;
      return state.filter((pizza) => pizza.pizzaId !== pizzaId);
    },

    reduceQuantity: (state, action) => {
      const { pizzaId, quantity } = action.payload;
      const pizza = state.find((pizza) => pizza.pizzaId === pizzaId);

      if (pizza.quantity > action.payload.quantity) {
        pizza.quantity -= quantity;
        pizza.totalPrice -= pizza.unitPrice * pizza.quantity;
      } else {
        return state.filter((pizza) => pizza.pizzaId !== pizzaId);
      }
    },

    addQuantity: (state, action) => {
      const { pizzaId, quantity } = action.payload;

      const pizza = state.find((pizza) => pizza.pizzaId === pizzaId);
      pizza.quantity += quantity;
      pizza.totalPrice += pizza.unitPrice * pizza.quantity;
    },

    clearCart: (state, action) => {
      return [];
    },
  },
});

export const getTotalPrice = (state) => {
  return state.cart.reduce((total, pizza) => total + pizza.totalPrice, 0);
};

export const {
  addToCart,
  removeFromCart,
  reduceQuantity,
  addQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
