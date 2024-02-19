import {Link} from "react-router-dom";
import React, {useState} from "react";
export default function Register(){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    function InsertUser(e){
        e.preventDefault()
        console.log(username)
        console.log(password)

        let body = {
            "username": username,
            "password": password
        }

        console.log(body)
        return fetch(`http://localhost:5000/login`,{
            'method':'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data!=null){
                    window.location.replace('http://localhost:3000/shoppingcartloggedin');
                }
            })
    }
    return (
        <div className="container" id="loginBackground">
            <div className="loginContainer">
                <h1>LOGIN</h1>
                <form onSubmit={e => {InsertUser(e)}}>
                    <label className="loginTefxt">Enter username</label><br/>
                    <input type="text" name="username" onChange={e => setUserName(e.target.value)}/><br/>
                    <label className="loginText">Enter password</label><br/>
                    <input type="text" name="password" onChange={e => setPassword(e.target.value)}/><br/>
                    <input className="iptBoxes iptModeration" type="submit" value="Login"></input>
                </form>
                <div className="loginText">If don't have an account yet, <Link to="/register">register here.</Link></div>
            </div>
        </div>
    )
}