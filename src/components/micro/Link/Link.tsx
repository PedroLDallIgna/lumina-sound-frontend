import { LinkProps } from './Link.props'
import styles from './Link.module.scss'
import { NavLink } from 'react-router-dom'
//import { Route } from 'react-router-dom'

const Link = ({children, url, classe}: LinkProps): JSX.Element => {
    const linkElement = () => {
        if (url.startsWith('http')) {
            return <a href={url} className={`${styles[`link--${classe}`]}`} target='_blank'>{children}</a>
        }
        return <NavLink to={url}>{children}</NavLink>
    }

    return (
        <>{linkElement()}</>
    )
}

export default Link;
