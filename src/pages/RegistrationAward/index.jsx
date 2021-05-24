import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiPlus, FiMinus } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa";

import InputsForRegistration from "../../components/InputsForRegistration";
import Modal from "../../components/Modal";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { toastType } from "../../utils/constants";

import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";
import RewardsService from "../../services/RewardsService";

import Header from "../../components/Header";
import getValidationErrors from "../../utils/getValidationErrors";

import {
  Container,
  Content,
  Schedule,
  Section,
  Award,
  CreateAward,
} from "./styles";
import Button from "../../components/Button";
import { Default } from "react-spinners-css";

const RegistrationAward = () => {
  const { addToast } = useToast();
  const { updateUser, user } = useAuth();

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(null);
  const [createAward, setCreateAward] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const formRef = useRef(null);

  useEffect(() => {
    const listReward = async () => {
      setLoading(true);
      const response = await RewardsService.ListReward().then((r) => r.data);
      setRewards(response);
      setLoading(false);
    };

    listReward();
  }, []);

  const handlerRecue = async (reward) => {
    try {
      if(reward.value > user.balance)
      {
        addToast({
          type: toastType.error,
          title: "Erro ao resgatar recompensa",
          description: "Você não possui pontos o suficiente para resgatar essa recompensa",
        });

        return;
      }

      const response = await RewardsService.RecueAward(reward.id).then(
        (r) => r.data
      );
      setIsLevelUpModalOpen(reward);
      updateUser(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAward = async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string()
          .required("Titulo obrigatório")
          .min(6, "No mínimo 6 dígitos"),
        value: Yup.number()
          .typeError("Informe um número. Ex: 5")
          .min(1, "Valor minimo é 1"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      var reward = await RewardsService.CreateReward(
        data.description,
        data.value
      ).then((r) => r.data);

      setRewards([...rewards, reward]);
      setCreateAward(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  };

  const loadingComponent = (
    <div
      style={{
        justifyContent: "center",
        borderBottom: "none",
      }}
    >
      <Default color="#ff9000" size={200} />
    </div>
  );

  const tree = () => {
    if (loading) return loadingComponent;

    if (createAward)
      return (
        <Form ref={formRef} key="1" onSubmit={handleAward}>
          <InputsForRegistration
            nameFirstInput="description"
            placeholderFirstInput="Descrição recompensa"
            nameSecondInput="value"
            placeholderSecondInput="Pontuação"
            nameTextArea=""
            placeholderTextArea=""
          />
          <Button type="submit">Salvar</Button>
        </Form>
      );

    if (rewards.length === 0 && !createAward && !loading)
      return <p>Nenhum recompensas cadastrada</p>;

    return rewards.map((reward) => (
      <Award key={reward.id}>
        <span>{reward.description}</span>
        <p>
          <BiCookie size={20} />
          {reward.value}
        </p>
        <button type="submit" onClick={() => handlerRecue(reward)}>
          Resgatar recompensa
        </button>
      </Award>
    ));
  };

  return (
    <Container>
      <Header>
        <Link to="/dashboard">
          <strong>Metas</strong>
        </Link>
        <Link to="/registrationAward">
          <strong>Recompensas</strong>
        </Link>
      </Header>
      <Content>
        <Schedule>
          <h1>Recompensas</h1>
          <Section>
            <div>
              {createAward ? (
                <>
                  <strong>Cadastrar nova recompensa</strong>
                  <CreateAward onClick={() => setCreateAward(false)}>
                    <FiMinus /> Cancelar
                  </CreateAward>
                </>
              ) : (
                <>
                  <strong>{rewards.length} Recompensas Cadastradas</strong>

                  <CreateAward
                    onClick={() => setCreateAward(true)}
                    disabled={loading}
                  >
                    <FiPlus /> Criar nova recompensa
                  </CreateAward>
                </>
              )}
            </div>
            {tree()}
          </Section>
          {isLevelUpModalOpen && (
            <Modal close={() => setIsLevelUpModalOpen(null)}>
              <header>
                <FaTrophy />
              </header>
              <strong>Parabéns</strong>
              <p>Você resgatou a recompensa {isLevelUpModalOpen.description}</p>
            </Modal>
          )}
        </Schedule>
      </Content>
    </Container>
  );
};
export default RegistrationAward;
