import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <main className="main">{pageContent}</main>
      <Footer viewCart={viewCart} />
    </>
  );

  return content;
}

export default App;
