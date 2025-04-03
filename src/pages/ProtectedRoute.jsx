import React from "react";
import { useAuth } from "../context/UserAuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ requireAdmin }) {
    const { user } = useAuth();
    // 주어진 조건이 맞지 않는다면, replace 기능으로 돌아가게 만들거임.
    // case1: 유저가 있는지 확인하기
    // case2: isAdmin인지 아닌지 확인하기
    if (!user) return <Navigate to="/" replace />;
    if (user && (!user.isAdmin || requireAdmin))
        return <Navigate to="/" replace />;
    return <div></div>;
}
