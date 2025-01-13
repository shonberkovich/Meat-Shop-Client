// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shop from "./Pages/Shop";
import ShoppingCart from "./Pages/ShoppingCart";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import NavbarLayout from "./Components/NavbarLayout";
import Contact from "./Pages/Contact";
import ScrollingBanner from "./Components/ScrollingBanner";
import Sidebar from "./Components/Sidebar";

function App() {
    return (
        <ShoppingCartProvider>
            <Router>

                <ScrollingBanner />
                {/*<div style={{ marginRight: '200px', padding: '20px' }}>*/}
                    <NavbarLayout>
                        <Routes>
                                <Route path="/" element={<Shop />} />
                            <Route path="/shoppingCart" element={<ShoppingCart />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </NavbarLayout>
                {/*</div>*/}
            </Router>
        </ShoppingCartProvider>

    );
}

export default App;
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Shop from "./Pages/Shop";
// import ShoppingCart from "./Pages/ShoppingCart";
// import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
// import NavbarLayout from "./Components/NavbarLayout";
// import Contact from "./Pages/Contact";
// import ScrollingBanner from "./Components/ScrollingBanner";
// import Sidebar from "./Components/Sidebar";
//
// function WithSidebarLayout({ children }) {
//     return (
//         <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row-reverse' }}>
//             <div style={{ width: '250px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', zIndex: 10 }}>
//                 <Sidebar />
//             </div>
//             <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9f9f9' }}>
//                 {children}
//             </div>
//         </div>
//     );
// }
//
//
//
//
// function DefaultLayout({ children }) {
//     return <div>{children}</div>;
// }
//
// function App() {
//     return (
//         <ShoppingCartProvider>
//             <Router>
//                 <ScrollingBanner />
//                 <NavbarLayout>
//                     <Routes>
//                         {/* דפים עם Sidebar */}
//                         <Route
//                             path="/"
//                             element={
//                                 <WithSidebarLayout>
//                                     <Shop />
//                                 </WithSidebarLayout>
//                             }
//                         />
//                         <Route
//                             path="/shoppingCart"
//                             element={
//                                 <DefaultLayout>
//                                     <ShoppingCart />
//                                 </DefaultLayout>
//                             }
//                         />
//
//                         {/* דפים ללא Sidebar */}
//                         <Route
//                             path="/contact"
//                             element={
//                                 <DefaultLayout>
//                                     <Contact />
//                                 </DefaultLayout>
//                             }
//                         />
//                     </Routes>
//                 </NavbarLayout>
//             </Router>
//         </ShoppingCartProvider>
//     );
// }
//
// export default App;
