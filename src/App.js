import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/Layout";
import SingUp from "./pages/SignUp";
import Cities from "./pages/Cities";
import Hotels from "./pages/Hotels";
import DetailsCard from "./pages/DetailsCard";
import NewCity from "./pages/NewCity";
import NewHotel from "./pages/NewHotel";
import MyCities from "./pages/MyCities";
import CityEdit from "./pages/CityEdit";

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
          <Route path="/details/:type/:id" element={<DetailsCard />} />
          <Route path="/newcity" element={<NewCity />} />
          <Route path="/newhotel" element={<NewHotel />} />
          <Route path="/cities/:userId" element={<MyCities />} />
          <Route path="/cities/edit/:id" element={<CityEdit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
