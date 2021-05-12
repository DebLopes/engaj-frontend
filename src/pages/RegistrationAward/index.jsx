import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiPlus, FiMinus } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import InputsForRegistration from '../../components/InputsForRegistration';
import TaskCompletedModal from "../../components/TaskCompletedModal";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useAuth } from '../../hooks/auth';
import RewardsService from "../../services/RewardsService";

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Header,
  HeaderContent,
  Content,
  Schedule,
  Section,
  Menu,
  Award,
  CreateAward,
  Profile
} from "./styles";
import Button from "../../components/Button";
import { Default } from 'react-spinners-css';

const RegistrationAward = () => {
  const { signOut, user, updateUser } = useAuth();

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [createAward, setCreateAward] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const formRef = useRef(null);

  useEffect(() => {
    const listReward = async () => {
      setLoading(true);
      const response = await RewardsService.ListReward().then((r) => r.data);
      setRewards(response)
      setLoading(false);
    }

    listReward();
  }, [])

  const handlerRecue = async (id) => {
    try {
      const response = await RewardsService.RecueAward(id).then((r) => r.data);
      updateUser(response);
      //  console.log(response)
      //  setLoading(true);

    } catch (err) { console.log(err) }
  }

  const handleAward = async (data) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string()
          .required('Titulo obrigatório')
          .min(6, 'No mínimo 6 dígitos'),
        value: Yup.number()
          .typeError('Informe um número. Ex: 5')
          .min(1, 'Valor minimo é 1')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      var response = await RewardsService.CreateReward(data.description, data.value).then((r) => r.data);

      setCreateAward(false);

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={user.avatar_url} alt={user.name}/>
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
              <strong style={{ justifySelf: "center", display: "flex", alignItems: "flex-end", marginTop: "10px" }}>
                <BiCookie size={24} color="#ff9000" />
                <strong style={{ paddingLeft: "8px" }}>
                  {user.balance}
                </strong>
              </strong>
            </div>
          </Profile>
          <Menu>
            <Link to="/dashboard">
              <strong>Metas</strong>
            </Link>
            <Link to="/registrationAward">
              <strong>Recompensas</strong>
            </Link>
          </Menu>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
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
                    <CreateAward onClick={() => setCreateAward(true)}>
                      <FiPlus /> Criar nova recompensa
                  </CreateAward>
                  </>
                )}
            </div>

            {createAward ? (
              <Form ref={formRef} key="1" onSubmit={handleAward}>
                <InputsForRegistration
                  nameFirstInput="description"
                  placeholderFirstInput="Descrição recompensa"
                  nameSecondInput="value"
                  placeholderSecondInput="Pontuação"
                  nameTextArea=""
                  placeholderTextArea=""
                />
                <Button type="submit">
                  Salvar
                  </Button>
              </Form>
            ) : (

                rewards.map((reward) => (
                  <Award key={reward.id}>
                    <span>{reward.description}</span>
                    <p>
                      <BiCookie size={20} />
                      {reward.value}
                    </p>
                    <button type="submit" onClick={() => handlerRecue(reward.id)}>Resgatar recompensa</button>
                  </Award>
                ))
              )}
            {rewards.length === 0 && <p>Nenhum recompensas cadastrada</p>}
          </Section>
          {isLevelUpModalOpen && (
            <TaskCompletedModal
              closeTaskCompletedModal={() => setIsLevelUpModalOpen(false)}
            />
          )}
        </Schedule>
      </Content>
    </Container>
  );
};
export default RegistrationAward;
