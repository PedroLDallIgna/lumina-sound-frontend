import styles from './Login.module.scss'

import Header from "../global/header/Header";
import Heading from '../../micro/Heading/Heading';
import Input from '../../micro/Input/Input';
import Link from '../../micro/Link/Link';

function Login() {
  return (
    <>
      <Header view="login"/>
      <main className={`${styles[`containerLogin`]}`}>
        <Heading level={1}>Efetuar Login</Heading>

        <Input campo="Email" type="text" classe="inputForm"/>
        <Input campo="Senha" type="password" classe="inputForm"/>

        <Heading level={3}>Não possui uma conta? <Link classe="linkCadastro" url="/signup">Cadastre-se</Link></Heading>

        <button type='submit' className={`${styles[`btnLogar`]}`}>Continuar</button>
      </main>
    </>
  )
}

export default Login
