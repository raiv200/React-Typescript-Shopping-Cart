import { useState, createContext, useEffect } from "react";

export type ProductType = {
  id: string;
  name: string;
  price: number;
};

const initialState: ProductType[] = [];

// const initialState : ProductType[] = [
//     {
//         "id":"item1",
//         "name":"Widget",
//         "price":9.99
//     },
//     {
//         "id":"item2",
//         "name":"Premium Widget",
//         "price":19.99
//     },
//     {
//         "id":"item3",
//         "name":"Deluxe Widget",
//         "price":29.99
//     }
// ]

export type UseProductsContextType = { products: ProductType[] };

const initialContextState = { products: [] };

const ProductsContext =
  createContext<UseProductsContextType>(initialContextState);

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

export const ProductsProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => res.json())
        .catch((err) => {
          if(err instanceof Error){
            console.log(err.message);
          }
        });

      return data;
    };

    fetchProducts().then( products => setProducts(products))

    return () => {};
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
