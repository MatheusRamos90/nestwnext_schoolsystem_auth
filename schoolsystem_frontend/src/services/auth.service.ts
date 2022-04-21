import Router from "next/router";
import { http } from "../config/axios-config";
import { UserLogged } from "../types/user-logged";
import { UserLoginRequest } from "../types/user-login-request";
import { UserRegisterRequest } from "../types/user-register-request";
import { clearCookies, setToken } from "../utils/cookies";

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signIn({ email, password }: UserLoginRequest) {
    await delay()
    const { data } = await http.post(`/auth/login`, { email, password }, { headers: { 'content-type': 'application/json' } })
    setToken(data)
    Router.push('/')
}

export async function signUp(request: UserRegisterRequest) {
    await delay()
    request.roles = request.roles.flatMap((r) => r.code)
    return await http.post(`/auth/new`, request, { headers: { 'content-type': 'application/json' } })
}

export async function getUser(token: string): Promise<UserLogged> {
    const { data } = await http.get(`/auth/profile`, { headers: { 'Authorization': `Bearer ${token}` } })
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