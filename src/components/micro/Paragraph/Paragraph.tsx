import { ParagraphProps } from './Paragraph.props';
import styles from './Paragraph.module.scss'

const Paragraph = ({name, children}: ParagraphProps): JSX.Element => {
    return (
        <p className={`${styles[`p--${name}`]}`}>{children}</p>
    )
}

export default Paragraph;
