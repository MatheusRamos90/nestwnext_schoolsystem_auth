import Link from 'next/link'
import { logout } from '../services/auth.service'
import { ToolbarProps } from '../types/toolbar-props'
import style from './style.module.css'


export default function Toolbar({ disabled, user }: ToolbarProps) {
    function onLogout() {
        logout()
    }

    return (
        <>
            {
                disabled ? 
                <div>
                    <nav className={style.toolbarNav}>
                        <div>
                            <Link href='/'>School System</Link>
                            {
                                user ?
                                ` - Login: ${user?.name}` : ''
                            }
                        </div>

                        <ul>
                            <li>
                                <Link href='/users'>Users</Link>
                            </li>
                            <li>
                                <a onClick={onLogout}>Sair</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                : null
            }
        </>
    )
}