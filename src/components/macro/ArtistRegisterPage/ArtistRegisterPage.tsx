import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "../global/footer/Footer"
import Header from "../global/header/Header"

import { useForm } from "react-hook-form"
import * as yup from "yup"
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import artistAccountServices from "../../../services/artistAccount.services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { UserDTO } from "../../../dtos/user.dto";
import useHttp from "../../../hooks/useHttp.hook";
import Input from "../../micro/Input/Input";
import Heading from "../../micro/Heading/Heading";

import styles from "./ArtistRegisterPage.module.scss"

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().optional()
});

type ArtistRegisterFormValues = yup.InferType<typeof registerSchema>;

const ArtistRegisterPage = ({ }) => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ArtistRegisterFormValues>({ resolver: yupResolver(registerSchema) });
  const currentUser = useSelector<RootState, UserDTO | undefined>(state => state.general.loggedUser)

  const registerArtist = useHttp(artistAccountServices.create)

  const onValidationSuccess = async (data: ArtistRegisterFormValues) => {
    const requestData: Partial<ArtistAccountDTO> = {
      ...data,
      userId: currentUser?.id ?? 0,
    }
    
    try {
      const response = await registerArtist(requestData);
      if (response.status === 201) navigate('/profile/artist')
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = handleSubmit(onValidationSuccess);

  return (
    <>
      <Header view="normal" />

      <main className={`${styles[`containerCadastro`]}`}>
        <Heading level={1}>Torne-se artista</Heading>
        
        <form onSubmit={onSubmit} className={styles.formContainer}>
          <Input id="nome" campo="Nome*" type="text" classe="inputForm" {...register("name")} />
          <Input id="nome-usuario" campo="Username*" classe="inputForm" type="text" {...register("username")} />
          <Input id="email" campo="Email" classe="inputForm" type="email" {...register("email")} />

          <button type="submit" className={`${styles[`btnLogar`]}`}>Criar conta</button>
        </form>
      </main>

      <Footer />
    </>
  )
}

export default ArtistRegisterPage;
