import { useReducer, useMemo,createContext} from "react";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initialCartState: CartStateType = {cart: []}

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE_QTY: "UPDATE_QTY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (state: CartStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("Action Payload is missing !!");
      }

      const { id, name, price } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { id, name, price, qty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("Action Payload is missing !!");
      }

      const { id } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return {
        ...state,
        cart: [...filteredCart],
      };
    }
    case REDUCER_ACTION_TYPE.UPDATE_QTY: {
      if (!action.payload) {
        throw new Error("Action Payload is missing !!");
      }

      const { id, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error("Item must exist to update cart");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return {
        ...state,
        cart: [...filteredCart, updatedItem],
      };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      throw new Error(`Unidentified ${action.type} type`);
  }
};

const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.qty;
  }, 0);

  const totalPrice  = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(state.cart.reduce((prevValue,cartItem) => {
    return prevValue + (cartItem.qty*cartItem.price)
  },0))


  const cart= state.cart.sort((a,b) => {
    const itemA = Number(a.id.slice(-4));
    const itemB = Number(b.id.slice(-4));
    return itemA - itemB
  })

  return {dispatch, REDUCER_ACTIONS,totalItems,totalPrice,cart}
};


export type UseCartContextType = ReturnType<typeof useCartContext>;

 const initialCartContextState : UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS:REDUCER_ACTION_TYPE,
    totalItems:0,
    totalPrice:'',
    cart:[]
}

const CartContext = createContext<UseCartContextType>(initialCartContextState);

type ChildrenType = {
    children?:React.ReactElement | React.ReactElement[]
}

export const CartProvider = ({children}: ChildrenType) : React.ReactElement => {
 
    return (
        <CartContext.Provider  value={useCartContext(initialCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext