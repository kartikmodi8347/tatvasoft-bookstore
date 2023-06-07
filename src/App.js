import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Searchbar from "./Components/Searchbar";
import { AuthWarpper } from "./context/auth";
import { CartWrapper } from "./context/cart";
import MyNavigation from "./MyNavigation";

function App() {
  return (
    <BrowserRouter>
      <AuthWarpper>
        <CartWrapper>
          <ToastContainer />
          <Header />
          <Searchbar />
          <MyNavigation />
          <Footer />
        </CartWrapper>
      </AuthWarpper>
    </BrowserRouter>
  );
}

export default App;
