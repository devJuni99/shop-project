import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onChangeAuth } from "../api/firebase";
import User from "./User";

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onChangeAuth((user) => setUser(user));
    }, []);

    console.log("로그인한 유저:", user);
    // 로그인이 안되었다면? login 버튼과 products만 보여주게 설정
    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link to="/" className="flex items-center text-4xl text-brand">
                <FiShoppingBag />
                <h1>Shoppy</h1>
            </Link>
            <nav className="flex items-center gap-4 font-semibold">
                {user && user.isAdmin ? (
                    <>
                        <Link to="/products">Products</Link>
                        <Link to="/carts">Carts</Link>
                        <Link to="/products/new" className="text-2xl">
                            <BsFillPencilFill />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/products">Products</Link>
                    </>
                )}

                {user && <User user={user} />}
                {!user && <button onClick={login}>Login</button>}
                {user && <button onClick={logout}>Logout</button>}
            </nav>
        </header>
    );
}
