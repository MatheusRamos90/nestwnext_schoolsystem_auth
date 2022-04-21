import Head from 'next/head'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import { Password } from 'primereact/password'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signUp } from '../services/auth.service'
import { UserRegisterRequest } from '../types/user-register-request'
import LoadingComponent from './loading-component'

export default function FormRegisterComponent({ toLogin }: any) {
    const [loading, setLoading] = useState(false)

    const defaultValues = {
        name: '',
        email: '',
        roles: [],
        password: '',
        repassword: ''
    }

    const roles: any = [
        { name: 'ADMIN', code: 'ADMIN' },
        { name: 'USER', code: 'USER' },
        { name: 'TI', code: 'TI' }
    ]

    const toast = useRef<any>(null)

    const {
        control,
        formState: { errors },
        setError,
        getValues,
        handleSubmit,
        reset } = useForm({ defaultValues })

    async function onRegister(data: UserRegisterRequest) {
        if (getValues('password') != getValues('repassword')) {
            setError('repassword', { message: 'Password dont match!' }, { shouldFocus: true })
            return
        }

        setLoading(true)
        try {
            await signUp(data)
                .then(() => {
                    setLoading(false)
                    toast.current.show({
                        severity: 'success',
                        summary: '',
                        detail: 'User created! Do your login clicking on button Sign In.',
                        life: 3000
                    });
                    reset()
                })
        } catch (error: any) {
            setLoading(false)
            console.error(error)
            toast.current.show({
                severity: 'error',
                summary: error.response && error.response.status || 400,
                detail: !error.response || !error.response.data ? "Occured an intern error. Check your request API." : error.response.data.message,
                life: 3000
            });
        }
    }

    return (
        <>
            <Head>
                <title>Register - School System</title>
            </Head>
            <LoadingComponent show={loading} />

            <div className='form-login' style={{ position: 'absolute', display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', zIndex: 1 }}>
                <div className="flex justify-content-center" style={{ alignSelf: 'center' }}>
                    <div className="card">
                        <h3 className="text-center mb-1">School System</h3>

                        <div className="text-center">
                            <small style={{ fontWeight: 'normal', fontSize: '14px' }}>Register yourself</small>

                            <form onSubmit={handleSubmit(onRegister)} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.error })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                                    </span>
                                    {errors.name && <small className="p-error">{errors.name.message}</small>}
                                </div>

                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <Controller name="email" control={control}
                                            rules={{ required: 'E-mail is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                                            )} />
                                        <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>E-mail*</label>
                                    </span>
                                    {errors.email && <small className="p-error">{errors.email.message}</small>}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="roles" control={control} render={({ field }) => (
                                            <MultiSelect id={field.name} value={field.value} options={roles} onChange={(e) => field.onChange(e.value)} optionLabel="name" placeholder="Select a Roles" />
                                        )} />
                                        <label htmlFor="roles">Roles</label>
                                    </span>
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                            <Password id={field.name} {...field} feedback={false} className={classNames({ 'p-invalid': fieldState.error })} />
                                        )} />
                                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                    </span>
                                    {errors.password && <small className="p-error">{errors.password.message}</small>}
                                </div>

                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="repassword" control={control} rules={{ required: 'Confirm password is required.' }} render={({ field, fieldState }) => (
                                            <Password id={field.name} {...field} feedback={false} className={classNames({ 'p-invalid': fieldState.error })} />
                                        )} />
                                        <label htmlFor="repassword" className={classNames({ 'p-error': errors.repassword })}>Confirm Password*</label>
                                    </span>
                                    {errors.repassword && <small className="p-error">{errors.repassword.message}</small>}
                                </div>

                                <Button type="submit" label="Sign Up" className="mt-2 mb-2" />
                            </form>

                            <hr />

                            <div className='text-center'>
                                <Button type='button' icon='pi pi-angle-double-left' label='Back to Sign In' className="mt-2" style={{ width: '100%' }} onClick={() => toLogin()}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref={toast} position="top-right"></Toast>
        </>
    )
}