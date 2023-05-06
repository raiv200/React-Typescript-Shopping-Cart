import React from 'react'
import { ProductType } from '../context/ProductsProvider'
import { ReducerActionType ,ReducerAction} from '../context/CartProvider'

type ProductPropsType ={
    product:ProductType,
    dispatch: React.Dispatch<ReducerAction>
    REDUCER_ACTIONS:ReducerActionType,
    inCart:boolean

}



const Product = ({product,dispatch,REDUCER_ACTIONS,inCart}: ProductPropsType) : React.ReactElement => {

  const img : string = new URL(`../images/${product.id}.jpg`,import.meta.url).href;

  const onAddToCart = () => {
    dispatch({type:REDUCER_ACTIONS.ADD, payload:{...product,qty:1}})
  }

  const itemInCart = inCart ? '👉 Item in cart ✔' : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img className='product__img' src={img} alt={product.name} />
      <p>
        {new Intl.NumberFormat('en-US',{style : 'currency', currency:'USD'}).format(product.price)} 
        {itemInCart}
      </p>
      <button onClick={onAddToCart} >
        Add to Cart
      </button>
    </article>
  )

  return content
}

export default Product