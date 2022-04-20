import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { http } from "../../config/axios-config"
import { UserDTO } from "../../dtos/user.dto"
import { withAuthServerSide } from "../../functions/with-auth-server-side"

const User: NextPage = ({ user }: UserDTO | any) => {
    return (
        <>
            <p>{ user.id }</p>
            <p>{ user.name }</p>
            <p>{ user.email }</p>

            <Link href={'/users'}>Voltar</Link>
        </>
    )
}

export default User

export const getServerSideProps: GetServerSideProps = withAuthServerSide(async ({ params }: any, token: any) => {
    const { data } = await http.get(`/user/${params.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
    const user: UserDTO[] = data

    return {
        props: { user }
    }
})