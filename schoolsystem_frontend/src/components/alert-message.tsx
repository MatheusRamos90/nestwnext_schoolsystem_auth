import style from './style.module.css'

export type AlertMessageProps = {
    show?: boolean,
    type?: string,
    message: string
}

export default function AlertMessage({ show, type, message }: AlertMessageProps) {

    function setType(type: string | undefined): string {
        switch (type) {
            case 'danger':
                return style.alertDanger
            case 'info':
                return style.alertInfo
            default:
                return style.alertInfo
        }
    }

    return (
        <>
            {
                show ? 
                    <div className={`${style.alertMessage} ${setType(type)}`}>
                        { message }
                    </div>
                : null
            }
        </>
    )

}