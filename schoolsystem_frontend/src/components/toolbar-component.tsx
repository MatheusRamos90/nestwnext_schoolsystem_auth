import Link from 'next/link';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import React from 'react';
import { logout } from '../services/auth.service';
import { ToolbarProps } from '../types/toolbar-props';

export default function ToolbarComponent({ user }: ToolbarProps) {
    const startContents = (
        <React.Fragment>
            <div style={{ fontWeight: 'bold' }}>
                <Link href='/'>School System</Link>
            </div>
        </React.Fragment>
    );

    const endContents = (
        <React.Fragment>
            <Button title={user?.name} label={user?.name} icon="pi pi-user" className="p-button-secondary p-button-text" />
            <Button title='Logout' onClick={onLogout} icon="pi pi-power-off" className="p-button-danger" />
        </React.Fragment>
    );

    function onLogout() {
        logout()
    }

    return (
        <>
            {
                <Menubar start={startContents} end={endContents} />
            }
        </>
    )
}