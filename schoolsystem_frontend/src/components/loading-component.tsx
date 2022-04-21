import { ProgressSpinner } from 'primereact/progressspinner'

type LoadingComponentProps = {
    show?: boolean
}

export default function LoadingComponent({ show }: LoadingComponentProps) {
    return (
        <>
            <div style={{ position: 'absolute', display: !show ? 'none' : 'flex', width: '100%', height: '100vh', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, .40)', zIndex: 2 }}>
                <ProgressSpinner strokeWidth="4" animationDuration='.5s' style={{ width: '50px', height: '50px', alignSelf: 'center' }} />
            </div>
        </>
    )
}