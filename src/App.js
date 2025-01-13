import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shop from "./Pages/Shop";
import ShoppingCart from "./Pages/ShoppingCart";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import NavbarLayout from "./Components/NavbarLayout";
import Contact from "./Pages/Contact";
import ScrollingBanner from "./Components/ScrollingBanner";

function App() {
    return (
        <ShoppingCartProvider>
            <Router>
                <ScrollingBanner />
                    <NavbarLayout>
                        <Routes>
                                <Route path="/" element={<Shop />} />
                            <Route path="/shoppingCart" element={<ShoppingCart />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </NavbarLayout>
            </Router>
        </ShoppingCartProvider>

    );
}

export default App;