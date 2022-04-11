import Router from "next/router";
import { http } from "../config/axios-config";
import { clearCookies, setToken } from "../hooks/cookies";
import { UserLogged } from "../types/user-logged";

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signIn(email: string, password: string) {
    await delay()
    const { data } = await http.post('/auth/login', { email, password }, { headers: { 'content-type': 'application/json' } })
    setToken(data)
    Router.push('/')
}

export async function getUser(token: string): Promise<UserLogged> {
    const { data } = await http.get('/auth/profile', { headers: { 'Authorization': `Bearer ${token}` } })
    const user: UserLogged = {
        id: data.sub,
        name: data.username
    }
    return user
}

export function logout() {
    console.log('Exiting... Removing cookies...')
    clearCookies()

    console.log('Redirecting to login...')
    Router.push('/auth/login')
}