import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onChangeAuth } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onChangeAuth((user) => setUser(user));
    }, []);

    console.log("로그인한 유저:", user);
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
                {!user && <Button onClick={login} text="login" />}
                {user && <Button onClick={logout} text="logout" />}
            </nav>
        </header>
    );
}
