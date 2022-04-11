import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { getToken } from "../hooks/cookies"
import { getUser } from "../services/auth.service"
import { UserLogged } from "../types/user-logged"
import isLoginPath from "../utils/utils"
import Toolbar from "./toolbar"

type AuthContextType = {
    user?: UserLogged
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthComponent({ children }: any) {
    const router = useRouter()
    const token = getToken()
    const [pathname, setPathname] = useState('')
    const [user, setUser] = useState<UserLogged>()

    useEffect(() => {
        setPathname(router.pathname)
        
        if (token) {
            getUser(token).then((response: UserLogged) => {
                setUser(response)
            })
        }
    }, [router])


    return ( 
        <AuthContext.Provider value={{ user }}>
            <Toolbar disabled={!isLoginPath(pathname)} user={user} />
            { children }
        </AuthContext.Provider>
    )
}