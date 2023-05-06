import { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "./CartLineItem";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, cart, totalItems, totalPrice } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2> Thank You for your Order.</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.id}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalItems}</p>
        <button
          onClick={onSubmitOrder}
          disabled={!totalItems}
          className="cart__submit"
        >
          Place Order
        </button>
      </div>
    </>
  );

  const content = (
    <main className="main main--cart">
      {pageContent}
    </main>
  )

  return content;
};

export default Cart;
