export default function ContentComponent({ children, loginPath }: any) {
    return (
        <>
            <div className="content-component" style={ loginPath ? { marginLeft: '200px', padding: '10px 15px 15px 40px' } : {} }>
                { children }
            </div>
        </>
    )
}