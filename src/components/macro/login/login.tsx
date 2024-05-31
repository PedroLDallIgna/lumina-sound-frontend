import styles from './Login.module.scss'

import Header from "../global/header/Header";
import Heading from '../../micro/Heading/Heading';
import Input from '../../micro/Input/Input';
import Link from '../../micro/Link/Link';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../store';
import authServices, { LoginRequest } from '../../../services/auth.services';
import { setSessionToken } from '../../../store/general';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

function Login() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const onValidationSuccess = (data: LoginFormValues) => {
    authServices
      .login(data as LoginRequest)
      .then((response) => {
        dispatch(setSessionToken(response.data.accessToken))
      })
      .catch((error) => console.error(error))
  }

  const onSubmit = handleSubmit(onValidationSuccess);

  return (
    <>
      <Header view="login"/>
      <main className={`${styles[`containerLogin`]}`}>
        <Heading level={1}>Efetuar Login</Heading>

        <form onSubmit={onSubmit} className={styles.formContainer}>
          <Input id="email" campo="Email" type="text" classe="inputForm" {...register('email')}/>
          <Input id="senha" campo="Senha" type="password" classe="inputForm" {...register('password')}/>

          <Heading level={3}>Não possui uma conta? <Link classe="linkCadastro" url="/signup">Cadastre-se</Link></Heading>

          <button type='submit' className={`${styles[`btnLogar`]}`}>Entrar</button>
        </form>
      </main>
    </>
  )
}

export default Login
