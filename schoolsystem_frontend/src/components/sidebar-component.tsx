import Link from 'next/link';
import { Tree } from 'primereact/tree';
import { useState } from 'react';

export default function SidebarComponent() {
    const [nodes, setNodes] = useState(createNavigation())

    function createNavigation() {
        return [
            {
                label: 'Users',
                url: '/users',
                icon: 'pi pi-users',
                children: [
                    {label: 'New', icon: 'pi pi-user-plus', url:'/users/new'}
                ]
            }
        ];
    }

    function nodeTemplate(node: any, options: any) {
        let label = <b>{node.label}</b>

        if (node.url) {
            label = <Link href={node.url}>{node.label}</Link>
        }

        return (
            <span className={options.className}>
                {label}
            </span>
        )
    }
    
    return (
        <>
            <div className='sidebar-component'>
                <Tree value={nodes} nodeTemplate={nodeTemplate} />
            </div>
        </>
    )
}