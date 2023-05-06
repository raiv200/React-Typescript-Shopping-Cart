import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { UseProductsContextType } from "../context/ProductsProvider";
import Product from "./Product";

const ProductList = () => {
  const { REDUCER_ACTIONS, dispatch, cart } = useCart();
  const { products } = useProducts();
  console.log(products)

  let pageContent: React.ReactElement | React.ReactElement[] = (
    <p>Loading ...</p>
  );

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.id === product.id);

      return (
        <Product
          key={product.id}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  const content = (
    <main className="main main--products">
        {pageContent}
    </main>
  )

  return content;
};

export default ProductList;
