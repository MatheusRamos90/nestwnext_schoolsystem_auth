import { useRouter } from "next/router";
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/auth.service";
import { UserLogged } from "../types/user-logged";
import { getToken, isTokenExpired } from "../utils/cookies";
import isLoginPath from "../utils/utils";
import ContentComponent from "./content-component";
import SidebarComponent from "./sidebar-component";
import ToolbarComponent from "./toolbar-component";
import WrapperComponent from "./wrapper-component";


type AuthContextType = {
    user?: UserLogged,
    token?: string,
    isAuthenticated?: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthComponent({ children }: any) {
    const router = useRouter()
    const token = getToken()
    const [pathname, setPathname] = useState('')
    const [user, setUser] = useState<UserLogged>()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setPathname(router.pathname)
        
        if (token) {
            getUser(token).then((response: UserLogged) => {
                setUser(response)
            })

            if (!isTokenExpired(token)) {
                setIsAuthenticated(true)
            }
        }
    }, [router]) // eslint-disable-line react-hooks/exhaustive-deps

    return ( 
        <AuthContext.Provider value={{ user, token, isAuthenticated }}>
            <WrapperComponent show={!isLoginPath(pathname)}>
                <ToolbarComponent user={user} />
                <SidebarComponent />
            </WrapperComponent>
            <ContentComponent loginPath={!isLoginPath(pathname)}>
                { children }
            </ContentComponent>
        </AuthContext.Provider>
    )
}