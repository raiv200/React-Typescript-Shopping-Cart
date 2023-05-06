import React from "react";

import {
  CartItemType,
  ReducerActionType,
  ReducerAction,
} from "../context/CartProvider";

type CartPropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: CartPropsType) => {
  const img: string = new URL(`../images/${item.id}.jpg`, import.meta.url).href;

  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: React.ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_QTY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item ">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="ItemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="ItemQty"
        id="ItemQty"
        className="select__cart"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>
      <div aria-label="Line Item Subtotal" className="cart__item-subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        onClick={onRemoveFromCart}
        title="Remove Item from cart"
        aria-label="Remove Item from Cart"
        className="cart__button"
      >
        ❌
      </button>
    </li>
  );

  return content;
};

export default CartLineItem;
