import React, { useMemo, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import Actions from "./Actions";
import { Form } from "@unform/web";
import * as Yup from "yup";
import GoalsService from "../../services/GoalsService";

import { useToast } from "../../hooks/toast";
import { toastType } from "../../utils/constants";

import Header from "../../components/Header";
import getValidationErrors from "../../utils/getValidationErrors";

import {
  Content,
  Schedule,
  Section,
  Calendar
} from "./styles";
import InputsForRegistration from "../../components/InputsForRegistration";
import Button from "../../components/Button";
import { v4 as uuidv4 } from "uuid";

const RegistrationGoals = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [disabledButton, setDisabledButton] = useState(false);

  const [actions, setActions] = useState([]);
  const [addFieldsOfTask, setAddFieldsOfTask] = useState(false);
  const [removeFieldsOfTask, setRemoveFieldsOfTask] = useState({
    remove: false,
    id: "",
  });

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const selectedDateAsText = useMemo(() => {
    return (
      from &&
      format(from, "'Dia' dd 'de' MMMM  - cccc", {
        locale: ptBR,
      })
    );
  }, [from]);

  const selectedDateAsTextEnd = useMemo(() => {
    return (
      to &&
      format(to, "'Dia' dd 'de' MMMM - cccc", {
        locale: ptBR,
      })
    );
  }, [to]);

  const handleGoal = async (data) => {
    setDisabledButton(true);
    try {
      formRef.current?.setErrors({});

      switch (true) {
        case addFieldsOfTask:
          const schema = Yup.object().shape({
            action: Yup.string().required("Descrição obrigatório"),
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
          setActions(
            [...actions].filter((i) => i.id !== removeFieldsOfTask.id)
          );
          setRemoveFieldsOfTask({ remove: false, id: "" });
          break;
        default:
          const schemaGoal = Yup.object().shape({
            titleGoal: Yup.string()
              .required("Titulo obrigatório"),
            description: Yup.string()
              .required("Descrição obrigatório"),
            points: Yup.number()
              .typeError("Informe um número. Ex: 5")
              .min(1, "Valor minimo é 1"),
          });
          
          await schemaGoal.validate(data, {
            abortEarly: false,
          });

          const schemaTask = Yup.object().shape({
            to: Yup.date()
              .required()
              .typeError("Data de fim obrigatória"),
            from: Yup.date()
              .required()
              .typeError("Data de inicio obrigatória"),
            actions: Yup.array()
              .min(1, "Adicione uma tarefa.")
              .required("É preciso adicicionar no minimo uma tarefa.")
              .nullable(),
          });

    
          await schemaTask.validate({to , from, actions}, {
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

          history.push("/dashboard");
          break;
      }

      setDisabledButton(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
 
        formRef.current?.setErrors(errors);

        if(errors.to){
          addToast({
            type: toastType.error,
            title: "Erro ao criar meta",
            description: errors.to
          });
        }

        if(errors.from){
          addToast({
            type: toastType.error,
            title: "Erro ao criar meta",
            description: errors.from
          });
        }

        if(errors.actions){
          addToast({
            type: toastType.error,
            title: "Erro ao criar meta",
            description: errors.actions
          });
        }

        return;
      }
    }
  };

  return (
    <div>
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
          <h1>Cadastrar Meta</h1>
          <p>
            <span>{selectedDateAsText}</span>
            <span>até</span>
            <span>{selectedDateAsTextEnd}</span>
          </p>
          <Form ref={formRef} key="1" onSubmit={handleGoal}>
            <InputsForRegistration
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

            <Button type="submit" disabled={disabledButton} >Salvar Meta</Button>
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
