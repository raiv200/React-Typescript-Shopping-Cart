import { useContext } from "react";
import ProductContext, { UseProductsContextType } from "../context/ProductsProvider";

const useProducts = (): UseProductsContextType => {
  return useContext(ProductContext);
};
 
export default useProducts;
