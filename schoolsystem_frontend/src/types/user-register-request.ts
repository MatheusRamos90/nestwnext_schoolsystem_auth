export type UserRegisterRequest = {
    name: string,
    email: string,
    roles: any[],
    password: string,
    repassword: string
}