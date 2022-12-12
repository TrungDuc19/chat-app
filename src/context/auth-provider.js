import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Spin } from "antd";

import { auth } from "../firebase/config";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, async user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, email, uid, photoURL
                });
                navigate('/');
            }
            else {
                navigate('/login')
            }
            setIsLoading(false);
        });

        //clean function
        return () => {
            unsubscribed();
        }
    }, [navigate]);

    return (
        <Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </Provider>
    )
}

export { AuthContext };
export default AuthProvider;