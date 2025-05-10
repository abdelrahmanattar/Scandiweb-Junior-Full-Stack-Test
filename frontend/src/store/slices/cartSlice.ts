// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductAttribute {
  attribute_name: string;
  attribute_type: "text" | "swatch";
  attribute_item: { value: string }[];
}
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  attributes?: { [key: string]: string } ;
  all_attributes?: { [key: string]: ProductAttribute} 
  image: string
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        item =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes || {}) === JSON.stringify(action.payload.attributes || {})
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    incrementItem(state, action: PayloadAction<{ id: string; attributes?: { [key: string]: string } }>) {
      const item = state.items.find(
        item =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes || {}) === JSON.stringify(action.payload.attributes || {})
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementItem(state, action: PayloadAction<{ id: string; attributes?: { [key: string]: string } }>) {
      const itemIndex = state.items.findIndex(
        item =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes || {}) === JSON.stringify(action.payload.attributes || {})
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    clearCart(state) {
      state.items = [];
    }
  },
});

export const selectCartCount = (state: any) =>
  state.cart.items.reduce((total: any, item: any) => total + item.quantity, 0);

export const { addItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
