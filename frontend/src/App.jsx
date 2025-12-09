import Main from "./Components/Main/Main";

import Error from "./Components/Pages/Error";

import "bootstrap/dist/css/bootstrap.min.css";

// import "./assets/css/bootstrap.css";
import "./assets/css/styles.css";

import { Route, Routes } from "react-router-dom";
import SharedLayout from "./Components/Pages/SharedLayout";
import Iphone from "./Components/Pages/Iphone";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Mac from "./Components/Pages/Mac";
import Ipad from "./Components/Pages/Ipad";
import Watch from "./Components/Pages/Watch";
import Tv from "./Components/Pages/Tv";
import Music from "./Components/Pages/Music";
import Support from "./Components/Pages/Support";
import Cart from "./Components/Pages/Cart";
import Search from "./Components/Pages/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="/ipad" element={<Ipad />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/music" element={<Music />} />
          <Route path="/support" element={<Support />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/apple" element={<Main />} />
          <Route path="/iphone" element={<Iphone />} />
          <Route path="/iphone/:pid" element={<SingleProduct />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
