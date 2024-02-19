import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
export default function ShoppingCartLoggedIn(){
    const [cart, setCart] = useState([])
    useEffect(() => {
        let t = []
        console.log(localStorage)
        for (let localStorageKey in localStorage) {
            t.push(JSON.parse(localStorage.getItem(localStorageKey)))
        }
        setCart(t)
    }, [])
    console.log(cart)
    function handleClick(e){
        localStorage.removeItem(e.currentTarget.id)
        let t = []
        console.log(localStorage)
        for (let localStorageKey in localStorage) {
            t.push(JSON.parse(localStorage.getItem(localStorageKey)))
        }
        setCart(t)
    }
    function clearCart(){
        localStorage.clear()
        setCart([])
    }
    function countWorth(){
        let totalPrice = 0;
        cart.forEach(item => {
            if(item!=null){
                totalPrice+=item.price;
            }
        })
        return totalPrice
    }
    function countItems(){
        let itemCount = 0
        cart.forEach(item => {
            if(item!=null){
                itemCount+=1
            }
        })
        return itemCount
    }
    return (
        <div className="container">
            <div id="options">
                <div id="inputs">
                    <select className="iptBoxes" id="orderList" >
                        <option className="iptBoxes" value="noOrder">No Order</option>
                        <option className="iptBoxes" value="asc">A - Z</option>
                        <option className="iptBoxes" value="desc">Z - A</option>
                    </select>
                </div>
                <div>
                    <Link to="/homeloggedin"><button className="iptBoxes" id="btnSearch">Home</button></Link>
                    <Link to="/"><button className="iptBoxes">Buy all</button></Link>
                    <Link to="/shoppingcart"><button className="iptBoxes">Logout</button></Link>
                    <button className="iptBoxes">Buy all</button>
                    <button className="iptBoxes" onClick={() => clearCart()}>Clear cart</button>
                </div>
            </div>
            <ul id="myUl">
                {cart.map(item => {
                    if(item){
                        return <li className="box" key={item.id} id={item.id}>
                            <div className="title"><h1>{item.title}</h1><p className="desc">{item.desc}</p></div>
                            <div className="bgDiv"><div id="opace"></div><h1 id="price">{item.price}$</h1><button id={item.id} className="store" onClick={e => handleClick(e)}>Remove</button><button className="store logedinBtn">Buy item</button><img className="bgImg" src={item.thumbnail} alt="image"/></div>
                        </li>
                    }
                })}
                <li>
                    <div className="box">
                        <h1>Items in cart {countItems()}</h1>
                        <h1>Worth {countWorth()} $</h1>
                    </div>
                </li>
            </ul>

        </div>
    )
}