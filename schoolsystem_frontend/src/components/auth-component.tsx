import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { getUser } from "../services/auth.service"
import { UserLogged } from "../types/user-logged"
import { getToken, isTokenExpired } from "../utils/cookies"
import isLoginPath from "../utils/utils"
import Toolbar from "./toolbar"

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
    }, [router])


    return ( 
        <AuthContext.Provider value={{ user, token, isAuthenticated }}>
            <Toolbar disabled={!isLoginPath(pathname)} user={user} />
            { children }
        </AuthContext.Provider>
    )
}