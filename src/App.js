import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import SingUp from "./pages/SingUp";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/singup" element={<SingUp/>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
