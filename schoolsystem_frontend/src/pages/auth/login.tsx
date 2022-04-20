import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import AlertMessage from '../../components/alert-message'
import { signIn } from '../../services/auth.service'
import styles from './style.module.css'

const AuthLogin: NextPage = () => {
  const form: any = useRef(null)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  async function onLoggin() {
    try {
      await signIn(form.current['email'].value, form.current['password'].value)
    } catch (error: any) {
      console.error(error)
      setMessage(!error.response || !error.response.data ? "Occured an intern error. Check your request API." : error.response.data.message)
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 3000)
    }
  }
  
  return (
    <>
      <Head>
        <title>Login - School System</title>
      </Head>
      <div className={styles.containerLogin}>
        <h2 style={{ textAlign: 'center' }}>School System</h2>
        <form className={styles.form} ref={form}>
          <label htmlFor='email'> Email
              <input type='email' id='email' className={styles.inputForm} />
          </label>
          <label htmlFor='password'> Password
              <input type='password' id='password' className={styles.inputForm} />
          </label>
          <button type='button' onClick={onLoggin}>Entrar</button>
        </form>
        <AlertMessage show={showMessage} message={message} type='danger' />
      </div>
    </>
  )
}

export default AuthLogin
