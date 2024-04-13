import { InputProps } from './Input.props'
import styles from './Input.module.scss'
//import { NavLink } from 'react-router-dom'
//import { Route } from 'react-router-dom'

const Input = ({type, classe, campo}: InputProps): JSX.Element => {
    return <input type={type} className={`${styles[`input--${classe}`]}`} placeholder={campo}/>
}

export default Input;