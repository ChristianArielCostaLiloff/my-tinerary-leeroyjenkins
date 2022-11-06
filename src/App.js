import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import SingUp from "./pages/SignUp";
import Cities from "./pages/Cities";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cities" element={<Cities/>}/>
          <Route path="/signup" element={<SingUp />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
