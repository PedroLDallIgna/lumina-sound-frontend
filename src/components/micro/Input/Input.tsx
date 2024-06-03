import { InputProps } from './Input.props'
import styles from './Input.module.scss'
import React from 'react';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({type, classe, campo, id, ...rest}: InputProps, ref): JSX.Element => {
    return(
        <input type={type} className={`${styles[`input--${classe}`]}`} placeholder={campo} name={id} {...rest} ref={ref}/>
    )
})

export default Input;