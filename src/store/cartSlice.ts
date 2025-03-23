import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [] };
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return { items: [] };
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
