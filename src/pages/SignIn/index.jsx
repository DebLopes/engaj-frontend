import React, { useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErrors";
import logoImg from "../../assets/logo05.png";
import { toastType } from '../../utils/constants';
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer, Background } from "./styles";

const SignIn = () => {
  const formRef = useRef(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um e-mail válido")
          .required("E-mail obrigatório"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push("/dashboard");
    } catch (err) {
      addToast({
        type: toastType.error,
        title: "Erro na autenticação",
        description: "Ocorreu um erro ao fazer login, cheque as credenciais.",
      });

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Engaj" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background>
        <span>
          Photo by
          <a href="https://unsplash.com/@intothefab?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Fabio Comparelli
          </a>
          on
          <a href="https://unsplash.com/s/photos/ponte%2C-floresta%2C-montanha?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </Background>
    </Container>
  );
};

export default SignIn;
