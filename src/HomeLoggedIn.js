import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom'
export default function HomeLoggedIn(){
    const url = 'https://dummyjson.com/products'
    const [items,setItems] = useState([])
    const [itemsHardCopy, setItemsHardCopy] = useState([])
    useEffect(() => {
        getData()
    }, []);
    let itemsCopy = items.map(a => {return {...a}})
    function cmpAsc(a,b){
        if (a.title>b.title) return 1
        else if(a.title<b.title) return -1
        return 0
    }
    function cmpDesc(a,b){
        return cmpAsc(a,b)*(-1)
    }
    function getData(){
        itemsCopy = []
        fetch(url)
            .then(res =>{
                return res.json()
            })
            .then(data => {
                let cnt = 0
                data.products.forEach(product => {
                    itemsCopy.push({title: product.title, desc: product.description, thumbnail: product.thumbnail, price: product.price, id: cnt, inCart: false})
                    cnt+=1
                })
                itemsCopy.forEach(item => {
                    if(localStorage.getItem(item.id) != null){
                        item.inCart = true
                    }
                })
                console.log(localStorage)
                setItems(itemsCopy)
                setItemsHardCopy(itemsCopy)
            })
    }
    function findItems(searchedValue){
        itemsCopy = itemsHardCopy.map(a => {return {...a}})
        let t = []
        itemsCopy.forEach(item => {
            if(item.title.toLowerCase().replaceAll(/\s/g,'').includes(searchedValue.toLowerCase().replaceAll(/\s/g,''))){
                t.push(item)
            }
        })
        setItems(t)
    }
    function sortItems(ordValue){
        console.log(ordValue)
        switch (ordValue) {
            case 'asc':
                console.log("sortItems")
                setItems(itemsCopy.sort(cmpAsc))
                console.log(items)
                console.log(itemsCopy)
                break
            case 'desc':
                console.log("sortItems")
                setItems(itemsCopy.sort(cmpDesc))
                console.log(items)
                console.log(itemsCopy)
                break
            case 'noOrder':
                console.log("sortItems")
                setItems(itemsHardCopy)
                break
            default:
                console.log("err")
                break
        }
    }
    function handleClick (e) {
        console.log(e.currentTarget.id)
        let temp = []
        if(localStorage.getItem(e.currentTarget.id) != null){
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.innerHTML = 'Add To Cart'
            localStorage.removeItem(e.currentTarget.id)
            console.log('4emove')
            console.log(items)
        }
        else{
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
            e.currentTarget.innerHTML = 'Remove '
            console.log(items)

            items.forEach(item => {
                console.log(item.id)
                console.log(e.currentTarget.id)
                if(item.id == e.currentTarget.id){
                    console.log('add')
                    console.log(item)
                    localStorage.setItem(item.id,JSON.stringify(item))
                    temp.push({title: item.title, desc: item.description, thumbnail: item.thumbnail, price: item.price, id: item.id, inCart: true})
                }else{
                    temp.push(item)
                }
            })
            // setItems(temp)
        }
        console.log(localStorage)
    }
    function clearCart(e){
        localStorage.clear()
        let temp = []
        items.forEach(item => {
            temp.push({title: item.title, desc: item.description, thumbnail: item.thumbnail, price: item.price, id: item.id, inCart: false})
        })
    }
    console.log('items')
    console.log(items)
    return (
        <div className="container">
            <div id="options">
                <div id="inputs">
                    <select className="iptBoxes" id="orderList" onChange={e => sortItems(e.target.value)}>
                        <option className="iptBoxes" value="noOrder">No Order</option>
                        <option className="iptBoxes" value="asc">A - Z</option>
                        <option className="iptBoxes" value="desc">Z - A</option>
                    </select>
                </div>
                <div>
                    <input className="iptBoxes" id="iptSearch" type="text" placeholder="Search Product" onChange={e => findItems(e.target.value)}/>
                    <Link to="/shoppingcartloggedin"><button className="iptBoxes" id="btnSearch">Shopping Cart</button></Link>
                    <Link to="/"><button className="iptBoxes">Logout</button></Link>
                    <button className="iptBoxes" onClick={e => clearCart(e)}>Clear cart</button>
                </div>
            </div>
            <ul id="myUl">
                {items.map(item => {
                    return <li className="box" key={item.id} id={item.id}>
                        <div className="title"><h1>{item.title}</h1><p className="desc">{item.desc}</p></div>
                        <div className="bgDiv"><div id="opace"></div><h1 id="price">{item.price}$</h1>
                            <button id={item.id} className="store" onClick={e => handleClick(e)} style={(localStorage.getItem(item.id)!=null) ? {backgroundColor: 'white', color: 'black'} : {backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>{localStorage.getItem(item.id)!=null ? 'Remove' : 'Add To Cart'}</button>
                            <img className="bgImg" src={item.thumbnail} alt="image"/></div>
                    </li>
                })}
            </ul>
        </div>
    );
}


