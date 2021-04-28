import React, { useMemo, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { format, addDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FiPower } from "react-icons/fi";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import Actions from "./Actions";
import { Form } from "@unform/web";
import * as Yup from 'yup';
import GoalsService from "../../services/GoalsService";

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Calendar,
  Menu,
} from "./styles";
import GoalDescription from "./GoalDescription";
import Button from "../../components/Button";
import { v4 as uuidv4 } from "uuid";

const user = {
  name: "Débora",
  avatar_url:
    "https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-mulher-no-icone-redondo_24640-14048.jpg",
};


const RegistrationGoals = () => {
  const formRef = useRef(null);

  const history = useHistory();

  const [actions, setActions] = useState([]);

  const [addFieldsOfTask, setAddFieldsOfTask] = useState(false);
  const [removeFieldsOfTask, setRemoveFieldsOfTask] = useState({ remove: false, id: '' });

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(from.addDays(2));

  const selectedDateAsText = useMemo(() => {
    return format(from, "'Dia' dd 'de' MMMM  - cccc", {
      locale: ptBR,
    });
  }, [from]);

  const selectedDateAsTextEnd = useMemo(() => {
    return format(to, "'Dia' dd 'de' MMMM - cccc", {
      locale: ptBR,
    });
  }, [to]);

  const handleGoal = async (data) => {

    try {
      formRef.current?.setErrors({});

      switch (true) {
        case addFieldsOfTask:

          const schema = Yup.object().shape({
            action: Yup.string()
              .required('Descrição obrigatório'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const value = [
            ...actions,
            {
              id: uuidv4(),
              action: data.action ? data.action : "",
            },
          ];

          setActions(value);
          setAddFieldsOfTask(false);
          break;
        case removeFieldsOfTask.remove:
          setActions([...actions].filter((i) => i.id !== removeFieldsOfTask.id));
          setRemoveFieldsOfTask({ remove: false, id: '' });
          break;
        default:
          const schemaGoal = Yup.object().shape({
            titleGoal: Yup.string()
              .required('Titulo obrigatório')
              .min(6, 'No mínimo 6 dígitos'),
            description: Yup.string()
              .required('Descrição obrigatório'),
            points: Yup.number()
              .typeError('Informe um número. Ex: 5')
              .min(1, 'Valor minimo é 1')
          });

          await schemaGoal.validate(data, {
            abortEarly: false,
          });

          const response = await GoalsService.CreateGoals(
            data.titleGoal,
            data.description,
            data.points,
            from,
            to,
            actions ? actions.map((t) => t.action) : []
          );

          history.push('/dashboard');
          break;
      }

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }

  return (
    <div>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
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
          <button type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Cadastrar Meta</h1>
          <p>
            <span>{selectedDateAsText}</span>
            <span>até</span>
            <span>{selectedDateAsTextEnd}</span>
          </p>
          <Form ref={formRef} key="1" onSubmit={handleGoal}>
            <GoalDescription
              nameFirstInput="titleGoal"
              placeholderFirstInput="Titulo Meta"
              nameSecondInput="points"
              placeholderSecondInput="Pontuação"
              nameTextArea="description"
              placeholderTextArea="Descrição"
            />

            <Section>
              <Actions
                setAddFieldsOfTask={setAddFieldsOfTask}
                setRemoveFieldsOfTask={setRemoveFieldsOfTask}
                actions={actions ? actions : []}
              />
            </Section>

            <Button type="submit">Salvar Meta</Button>
          </Form>
        </Schedule>

        <Calendar>
          <DayPicker
            numberOfMonths={2}
            selectedDays={[from, { from, to }]}
            onDayClick={(date) => {
              const range = DateUtils.addDayToRange(date, { from, to });
              setFrom(range.from);
              setTo(range.to);
            }}
            weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
            fromMonth={new Date()}
            disabledDays={[
              {
                before: new Date(),
              },
            ]}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ]}
          />
        </Calendar>
      </Content>
    </div>
  );
};

export default RegistrationGoals;
