import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct } from "./pages/AddProduct";
import { Products } from "./pages/Products";
import { GlobalStyle } from "./GlobalStyles";


function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products/>}></Route>
          <Route path="/add-product" element={<AddProduct/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
