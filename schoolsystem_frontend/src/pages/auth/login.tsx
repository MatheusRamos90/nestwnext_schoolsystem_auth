import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FormLoginComponent from '../../components/form-login-component'
import FormRegisterComponent from '../../components/form-register-component'

const AuthLogin: NextPage = () => {
  const router = useRouter()
  const [showRegister, setShowRegister] = useState(false)

  function callbackToRegister() {
    router.push({ pathname: '/auth/login', query: 'screen=register' }, undefined, { shallow: true })
    setShowRegister(true)
  }

  function callbackToLogin() {
    router.push({ pathname: '/auth/login', query: '' }, undefined, { shallow: true })
    setShowRegister(false)
  }

  return (
    <>
      {
        (Object.keys(router.query).length > 0 && router.query.screen === 'register') || showRegister ?
          <FormRegisterComponent toLogin={callbackToLogin} />
          :
          <FormLoginComponent toRegister={callbackToRegister} />
      }
    </>
  )
}

export default AuthLogin
