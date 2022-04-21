import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../components/loading-component";
import { http } from "../../config/axios-config";
import { UserDTO } from "../../dtos/user.dto";
import { withAuthServerSide } from "../../functions/with-auth-server-side";

const Users: NextPage = ({ users }: UserDTO[] | any) => {
    const [loading, setLoading] = useState(true)
    const toast = useRef<any>(null)
    const usersDt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [usersTable, setUsersTable] = useState<UserDTO[]>([])
    const [usersSelected, setUsersSelected] = useState<any>(null);
    // const router = useRouter()

    // const roles = [
    //     { label: 'Admin', value: 'ADMIN' },
    //     { label: 'User', value: 'USER' },
    //     { label: 'TI', value: 'TI' }
    // ];

    // function getRolesLabel(role: any) {
    //     switch (role) {
    //         case 'ADMIN':
    //             return 'Admin';

    //         case 'USER':
    //             return 'User';

    //         case 'TI':
    //             return 'TI';

    //         default:
    //             return 'USER';
    //     }
    // }

    const headerTable = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Users</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    function openNew() {
        console.log('new...')
    }

    function edit(user: any) {
        // setProduct({...product});
        // setProductDialog(true);
    }

    function confirmDelete(user: any) {
        // setProduct(product);
        // setDeleteProductDialog(true);
    }

    function confirmDeleteSelected() {
        // setDeleteProductsDialog(true);
    }

    function leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-primary mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!usersSelected || !usersSelected.length} />
            </React.Fragment>
        )
    }

    function actionBodyTemplate(rowData: any) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => edit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    useEffect(() => {
        if (users) {
            setLoading(false)
            setUsersTable(users)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // function getUser(user: UserDTO | any) {
    //     router.push(`/users/${user.id}`)
    // }

    return (
        <>
            <Head>
                <title>Users - School System</title>
            </Head>

            <LoadingComponent show={loading} />

            <div className="datatable-crud-demo">
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={usersDt} value={usersTable} selection={usersSelected} onSelectionChange={(e) => setUsersSelected(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} header={headerTable} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="email" header="E-mail" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="roles" header="Roles" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>
            </div>

            <Toast ref={toast} position="top-right"></Toast>

            {/* {
                users.map((user: UserDTO) => (
                    <p onClick={() => getUser(user)} key={user.email}>{user.id} - {user.name}</p>
                ))
            } */}
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