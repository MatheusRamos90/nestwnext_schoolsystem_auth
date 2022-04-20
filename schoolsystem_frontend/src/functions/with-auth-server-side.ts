import { ACCESS_TOKEN, clearCookies, isTokenExpired, parseCookies } from "../utils/cookies";

export function withAuthServerSide(func: any) {
    return async (ctx: any) => {
        const cookies = parseCookies(ctx.req)
        const accessToken = cookies[ACCESS_TOKEN]

        if (!accessToken || isTokenExpired(accessToken)) {
            clearCookies()

            return {
                    redirect: {
                    permanent: false,
                    destination: "/auth/login",
                },
            };
        }

        return func(ctx, accessToken)
    }
}