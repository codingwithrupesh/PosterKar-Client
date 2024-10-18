import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload.attributes;
            // console.log("product is" , product);

            const curItem = product ? {
                Title: product.Title,
                Key: product.Key,
                Price: product.Price,
                Image: product.Image.data.attributes.url
            } : action.payload;

            const index = state.cart.findIndex(
                (item) => item.Key === curItem.Key
            );
            // console.log(" curr item is ->", curItem, "index is in state->",index);
            if (index === -1) {
                state.cart.push({ ...curItem, quantity: 1 });
                // console.log("if is this push or not");
            } else {
                state.cart[index].quantity += 1;
                // console.log("if already present in cart quanitity ++");

            }
        },
        removeFromCart: (state, action) => {
            const curKey = action.payload?.attributes?.Key || action.payload.Key;
            // console.log("key Aayi haai slice me", curKey);
            const index = state.cart.findIndex(
                (item) => item.Key === curKey
            );
            // console.log("key Aayi haai slice me", curKey, "At Index -> ", index);

            if(index === -1) return;
            if (state.cart[index].quantity === 1) {
                state.cart = state.cart.filter(
                    (item) => item.Key !== curKey
                );
            } else {
                state.cart[index].quantity -= 1;
            }
        },
        // create an action to removeCartItem
        resetCart: (state, action) => {
            state.cart = []
        }
    },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;