import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
    selectedCategory: string;
}

const initialState: CategoryState = {
  selectedCategory: 'all',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;