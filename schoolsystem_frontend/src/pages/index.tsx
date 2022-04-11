import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { withAuth } from '../hooks/withauth'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard - School System</title>
      </Head>
      <h2>Dashboard!!</h2>
    </>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx: any, token: any) => {
  return { props: {} }
})