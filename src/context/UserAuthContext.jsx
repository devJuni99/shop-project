import { createContext, useContext, useEffect, useState } from "react";
import { onChangeAuth } from "../api/firebase";
// TODO: user의 Context에서 관리하고, 필요한 부분들에 공급한다.
// ProtectedRoute에 user의 객체를 넘겨주고, isAdmin인지 user인지 각각의 분기점을 나눠준다.

export const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onChangeAuth((user) => setUser(user));
    }, []);

    return (
        <UserAuthContext.Provider value={{ user }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(UserAuthContext);
}
