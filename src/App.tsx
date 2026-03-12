import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import ProductionCapacity from "@/pages/ProductionCapacity";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Consultation from "@/pages/Consultation";
import { Empty } from "@/components/Empty";
import Layout from "@/components/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/production-capacity" element={<ProductionCapacity />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}