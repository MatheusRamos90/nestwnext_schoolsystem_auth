import Head from 'next/head'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signIn } from '../services/auth.service'
import { UserLoginRequest } from '../types/user-login-request'
import LoadingComponent from './loading-component'

export default function FormLoginComponent({ toRegister }: any) {
    const [loading, setLoading] = useState(false)
    const defaultValues = {
        email: '',
        password: ''
    }
    const toast = useRef<any>(null)

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset } = useForm({ defaultValues })

    async function onLoggin(data: UserLoginRequest) {
        setLoading(true)
        try {
            await signIn(data)
                .then(() => {
                    setLoading(false)
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
                <title>Login - School System</title>
            </Head>
            <LoadingComponent show={loading} />

            <div className='form-login' style={{ position: 'absolute', display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', zIndex: 1 }}>
                <div className="flex justify-content-center" style={{ alignSelf: 'center' }}>
                    <div className="card">
                        <h3 className="text-center mb-1">School System</h3>

                        <div className="text-center">
                            <small style={{ fontWeight: 'normal', fontSize: '14px' }}>Do your login</small>

                            <form onSubmit={handleSubmit(onLoggin)} className="p-fluid">
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
                                        <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                            <Password id={field.name} {...field} feedback={false} className={classNames({ 'p-invalid': fieldState.error })} />
                                        )} />
                                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                    </span>
                                    {errors.password && <small className="p-error">{errors.password.message}</small>}
                                </div>

                                <Button type="submit" label="Sign In" className="mt-2 mb-2" />
                            </form>

                            <hr />

                            <div className='text-center'>
                                <small>Dont have an account?</small>
                                <Button type="button" label="Register" className="mt-2" style={{ width: '100%' }} onClick={() => toRegister()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref={toast} position="top-right"></Toast>
        </>
    )
}