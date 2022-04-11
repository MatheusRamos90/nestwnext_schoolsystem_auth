import { NextPage } from "next";

const InternalServerErrorPage: NextPage = () => {
    return (
        <>
            <h2>Oops! There was an intern error. Check your APIs call or your app settings.</h2>
        </>
    )
}

export default InternalServerErrorPage