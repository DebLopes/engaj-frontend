import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiPlus, FiMinus } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import GoalDescription from '../RegistrationGoals/GoalDescription';
import LevelUpModal from "../../components/LevelUpModal";
import { Form } from "@unform/web";
import * as Yup from "yup";

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
} from "./styles";
import Button from "../../components/Button";

const RegistrationAward = () => {
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [createAward, setCreateAward] = useState(false);
  const [rewards, setRewards] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    const listReward = async () => {
      const response = await  RewardsService.ListReward().then((r) => r.data);
      setRewards(response)
    }

    listReward();
  }, [])


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

     var response =  await RewardsService.CreateReward(data.description, data.value).then((r) => r.data);

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
          <Menu>
            <Link to="/dashboard">
              <strong>Metas</strong>
            </Link>
            <Link to="/registrationGoals">
              <strong>Criar nova Meta</strong>
            </Link>
          </Menu>
          <button type="button">
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

            {rewards.length === 0 && <p>Nenhum recompensas cadastrada</p>}
            {createAward ? (
              <Form ref={formRef} key="1" onSubmit={handleAward}>
                <GoalDescription
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
                    <button type="submit">Resgatar recompensa</button>
                  </Award>
                ))
              )}
          </Section>
          {isLevelUpModalOpen && (
            <LevelUpModal
              level={2}
              closeLevelUpModal={() => setIsLevelUpModalOpen(false)}
            />
          )}
        </Schedule>
      </Content>
    </Container>
  );
};
export default RegistrationAward;
