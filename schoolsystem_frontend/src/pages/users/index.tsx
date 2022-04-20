import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { http } from "../../config/axios-config"
import { UserDTO } from "../../dtos/user.dto"
import { withAuthServerSide } from "../../functions/with-auth-server-side"

const Users: NextPage = ({ users }: UserDTO[] | any) => {
    const router = useRouter()
    // const [loading, setLoading] = useState(false)
    // const [users, setUsers] = useState<UserDTO[]>([])
    
    // useEffect(() => {
    //     setLoading(true)
    //     http
    //         .get(`/user`, { headers: { 'Authorization': `Bearer ${getToken()}` } })
    //         .then((resp) => {
    //             setUsers(resp.data)
    //             setLoading(false)
    //         })
    // }, [])

    function getUser(user: UserDTO | any) {
        router.push(`/users/${user.id}`)
    }

    return (
     <>
        <Head>
            <title>Users - School System</title>
        </Head>
        {
            // loading ? <div>Loading...</div> :
            users.map((user: UserDTO) => (
                <p onClick={() => getUser(user)} key={user.email}>{ user.id } - { user.name }</p>
            ))
        }
     </>
    )
}

export default Users

export const getServerSideProps: GetServerSideProps = withAuthServerSide(async (ctx: any, token: any) => {
    const { data } = await http.get(`/user`, { headers: { 'Authorization': `Bearer ${token}` } })
    const users: UserDTO[] = data

    return {
        props: { users }
    }
})