import styles from './Signup.module.scss'

import Header from "../global/header/Header";
import Heading from '../../micro/Heading/Heading';
import Input from '../../micro/Input/Input';
import Link from '../../micro/Link/Link';

function Signup() {
  return (
    <>
      <Header view="login"/>
      <main className={`${styles[`containerCadastro`]}`}>
        <Heading level={1}>Efetuar Cadastro</Heading>

        <Input id="nome" campo="Nome" type="text" classe="inputForm"/>
        <Input id="email" campo="Email" type="email" classe="inputForm"/>
        <Input id="senha" campo="Senha" type="password" classe="inputForm"/>
        <Input id="confirmarSenha" campo="Confirmar senha" type="password" classe="inputForm"/>
        <Input id="dataNasc" campo="Data de Nascimento" type="date" classe="inputForm"/>

        <div className={`${styles[`containerRadio`]}`}>
          <div className={`${styles[`divRadios`]}`}>
                <input type="radio" id="masculino" name="sexo" value="Masculino"/>
                <label htmlFor="masculino">Masculino</label>
                <input type="radio" id="feminino" name="sexo" value="Feminino"/>
                <label htmlFor="feminino">Feminino</label>
          </div>
        </div>
        <Heading level={3}>Já possui uma conta? <Link classe="linkCadastro" url="/login">Efetuar Login</Link></Heading>

        <button type='submit' className={`${styles[`btnLogar`]}`}>Continuar</button>
      </main>
    </>
  )
}

export default Signup
