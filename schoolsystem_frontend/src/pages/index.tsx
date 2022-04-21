import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { withAuthServerSide } from '../functions/with-auth-server-side'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard - School System</title>
      </Head>
      <h3>Dashboard!!</h3>
    </>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = withAuthServerSide(async (ctx: any, token: any) => {
  return { props: {} }
})