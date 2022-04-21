export default function WrapperComponent({ children, show }: any) {
    return (
        <>
            { show ? children : null }
        </>
    )
}