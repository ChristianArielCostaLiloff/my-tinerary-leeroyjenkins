import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/Layout";
import SingUp from "./pages/SignUp";
import Cities from "./pages/Cities";
import Hotels from "./pages/Hotels";
import DetailsCard from "./components/DetailsCard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/details/:id" element={<DetailsCard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
