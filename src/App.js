import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
    return (
        <>
            <UserAuthContextProvider>
                <Navbar />
                <Outlet />
            </UserAuthContextProvider>
        </>
    );
}

export default App;
