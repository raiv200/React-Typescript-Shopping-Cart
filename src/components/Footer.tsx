import useCart from "../hooks/useCart";

type FooterPropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: FooterPropsType) => {
  const { totalItems, totalPrice } = useCart();

  const year = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p>Copyright &copy; | {year} , Made by @raivikas200 </p>
  ) : (
    <>
      <p>Total Items: {totalItems} </p>
      <p>Total Price: {totalPrice ? totalPrice : "$0"} </p>
      <p>Copyright &copy; | {year} , Made by @raivikas200 </p>
    </>
  );

  const content = (
    <footer className="footer">
       {pageContent}
    </footer>
  )

  return content;
};

export default Footer;
