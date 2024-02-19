import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ShoppingCart from "./ShoppingCart";
import ShoppingCartLoggedIn from "./ShoppingCartLoggedIn";
import HomeLoggedIn from "./HomeLoggedIn";
export default function App(){
    return(
        <>
            <Router basename="/react-test-2">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/homeloggedin" element={<HomeLoggedIn/>}/>
                    <Route path="/shoppingcart" element={<ShoppingCart/>}/>
                    <Route path="/shoppingcartloggedin" element={<ShoppingCartLoggedIn/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<h1>PAGE NOT FOUND</h1>}/>
                </Routes>
            </Router>
        </>
    )
}


