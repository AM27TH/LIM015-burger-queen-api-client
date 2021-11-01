import { TYPES } from "./actions";

export const shoppingInitialState = {
  products: null,
  cart: [],
  client: '',
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.READ_PRODUCTS: {
      return {
        ...state,
        products: action.payload.map((data) => ({ ...data, id: data._id })),
      };
    }
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    totalPrice: item.totalPrice + item.price,
                  }
                : item
            ),
          }
        : {
            ...state,
            cart: [
              { ...newItem, quantity: 1, totalPrice: newItem.price },
              ...state.cart,
            ],
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    totalPrice: item.totalPrice - item.price,
                  }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case TYPES.SET_CLIENT: {
      return {...state, client: action.client}
    }
    case TYPES.CLEAR_CART:
      return { ...state, cart: [], client: '' };
    case TYPES.NO_DATA:
      return { ...state, products: null };
    default:
      return state;
  }
}
