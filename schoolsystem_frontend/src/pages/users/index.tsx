import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { http } from "../../config/axios-config"
import { UserDTO } from "../../dtos/user.dto"
import { withAuth } from "../../hooks/withauth"

const Users: NextPage = ({ users, date }: UserDTO[] | any) => {
    const router = useRouter()

    function getUser(user: UserDTO | any) {
        router.push(`/users/${user.id}`)
    }

    return (
     <>
        <Head>
            <title>Users - School System</title>
        </Head>
        <h4>{ date }</h4>
        {
            users.map((user: UserDTO) => (
                <p onClick={() => getUser(user)} key={user.email}>{ user.id } - { user.name }</p>
            ))
        }
     </>
    )
}

export default Users

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx: any, token: any) => {
    const { data } = await http.get(`/user`, { headers: { 'Authorization': `Bearer ${token}` } })
    const users: UserDTO[] = data

    return {
        props: { users }
    }
})