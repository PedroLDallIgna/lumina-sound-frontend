import { MessageResultProps } from './MessageResult.props';
import styles from './MessageResult.module.scss'

const MessageResult = ({message, status}: MessageResultProps): JSX.Element => {

    switch(status) {
        case "success":
            return (
                <p className={`${styles[`${status}`]}`}>{message}</p>
            )
        case "error":
            return (
                <p className={`${styles[`${status}`]}`}>{message}</p>
            )
        default:
            return (
                <p className={`${styles[`${status}`]}`}>{message}</p>
            )
    }
}

export default MessageResult;
