import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import "react-day-picker/lib/style.css";
import Input from "../../components/Input";
import {
  RegisterNewTask,
  Section,
  ListActions,
} from "./styles";


const Actions = (props) => {
  const { setAddFieldsOfTask, setRemoveFieldsOfTask, actions} = props;

  const [inputFields, setInputFields] = useState([]);

  useEffect(() => { setInputFields([...actions]) }, [actions])

  return (
    <Section>
      <strong>Adicione uma nova tarefa</strong>
      {inputFields.map((a, i) => (
        <ListActions>
          <ul key={i}>
            <li>{a.action}</li>
            <button type="submit" onClick={() => setRemoveFieldsOfTask({ remove: true, id: a.id })}>
              <FiTrash strokeWidth={2} />
            </button>
          </ul>
        </ListActions>
      ))}
      <RegisterNewTask>
        <Input name="action" placeholder="Informe a tarefa" />
        <button type="submit" onClick={() => setAddFieldsOfTask(true)}>
          <FiPlus strokeWidth={2} />
        </button>
      </RegisterNewTask>
    </Section>
  );
};

export default Actions;
