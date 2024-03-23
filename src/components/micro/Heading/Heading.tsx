import { HeadingProps } from './Heading.props';
import styles from './Heading.module.scss'

const Heading = ({level, children, ...props}: HeadingProps): JSX.Element => {

    const getHeading = (): JSX.Element => {
        switch(level) {
            case 1:
                return <h1 {...props} className={`${styles[`heading--${level}`]} ${props.className ?? ''}`}>{children}</h1>
            case 2:
                return <h2 {...props} className={`${styles[`heading--${level}`]} ${props.className ?? ''}`}>{children}</h2>
            case 3:
                return <h3 {...props} className={`${styles[`heading--${level}`]} ${props.className ?? ''}`}>{children}</h3>
            case 4:
                return <h4 {...props} className={`${styles[`heading--${level}`]} ${props.className ?? ''}`}>{children}</h4>
            case 5:
                return <h5 {...props} className={`${styles[`heading--${level}`]} ${props.className ?? ''}`}>{children}</h5>
            case 6:
                return <h6 {...props} className={`${styles[`heading--${level}`]} ${props.className ?? ''}`}>{children}</h6>
            default:
                return <h1 {...props} className={`${styles[`heading--1`]} ${props.className ?? ''}`}>{children}</h1>
        }
    }

    return <>{getHeading()}</>
}

export default Heading;
