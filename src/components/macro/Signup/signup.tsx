import styles from './Signup.module.scss'

import Header from "../global/header/Header";
import Heading from '../../micro/Heading/Heading';
import Input from '../../micro/Input/Input';
import Link from '../../micro/Link/Link';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authServices from '../../../services/auth.services';
import type { RegisterRequest } from '../../../services/auth.services';
import { useNavigate } from 'react-router-dom';

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  birthDate: yup.string(),
  sex: yup.string().oneOf(['M', 'F']),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });

  const onValidationSuccess = (data: RegisterFormValues) => {
    authServices
      .register(data as RegisterRequest)
      .then((response) => {
        navigate('/login')
      })
      .catch((error) => console.error(error))
  }
  
  const onSubmit = handleSubmit(onValidationSuccess);

  return (
    <>
      <Header view="login"/>
      <main className={`${styles[`containerCadastro`]}`}>
        <Heading level={1}>Efetuar Cadastro</Heading>

        <form onSubmit={onSubmit} className={styles.formContainer}>
          <Input id="nome" campo="Nome" type="text" classe="inputForm" {...register('name')}/>
          <Input id="nome-usuario" campo="Nome de usuário" type="text" classe="inputForm" {...register('username')}/>
          <Input id="email" campo="Email" type="email" classe="inputForm" {...register('email')}/>
          <Input id="senha" campo="Senha" type="password" classe="inputForm" {...register('password')}/>
          <Input id="dataNasc" campo="Data de Nascimento" type="date" classe="inputForm" {...register('birthDate')}/>

          <div className={`${styles[`containerRadio`]}`}>
            <div className={`${styles[`divRadios`]}`}>
                  <input {...register('sex')} type="radio" id="masculino" value="M"/>
                  <label htmlFor="masculino">Masculino</label>
                  <input {...register('sex')} type="radio" id="feminino" name="sexo" value="F"/>
                  <label htmlFor="feminino">Feminino</label>
            </div>
          </div>
          <Heading level={3}>Já possui uma conta? <Link classe="linkCadastro" url="/login">Efetuar Login</Link></Heading>

          <button type='submit' className={`${styles[`btnLogar`]}`}>Continuar</button>
        </form>
      </main>
    </>
  )
}

export default Signup
