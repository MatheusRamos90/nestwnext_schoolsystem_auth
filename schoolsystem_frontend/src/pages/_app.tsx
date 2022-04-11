import { AppProps } from 'next/app'
import '../../styles/globals.css'
import AuthComponent from '../components/auth-component'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <AuthComponent>
          <Component {...pageProps} />
        </AuthComponent>
      </>
  )
}

export default MyApp
