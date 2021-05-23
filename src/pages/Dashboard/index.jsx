import React, { useState, useEffect } from "react";

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

import GoalsService from "../../services/GoalsService";

import { toastType } from "../../utils/constants";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FiFlag, FiPlus, FiTrash2 } from "react-icons/fi";
import Modal from "../../components/Modal";
import { Default } from "react-spinners-css";
import Checkbox from "../../components/Checkbox";

import { FaTrophy } from "react-icons/fa";
import { BiCookie } from "react-icons/bi";

import Header from "../../components/Header";

import {
  Container,
  Content,
  Schedule,
  Section,
  Goals,
  GoalsTitle,
  ProgressBar,
} from "./styles";

const Dashboard = () => {
  const { updateUser, user } = useAuth();
  const { addToast } = useToast();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTaskCompletedModalOpen, setTaskCompletedModalOpen] = useState(null);

  const deleteGoal = async (id) => {
    try {
      setLoading(true);
      await GoalsService.DeleteGoal(id);
      const copyGoal = [...goals];
      setGoals(copyGoal.filter((g) => g.id !== id));
      setLoading(false);
    } catch (err) {
      addToast({
        type: toastType.error,
        title: "Não foi possível excluir a meta"
      });
      console.log(err);
    }
  };

  useEffect(() => {
    const listGoals = async () => {
      setLoading(true);
      setGoals([]);
      const response = await GoalsService.ListGoals().then((r) => r.data);
      setGoals(response);
      setLoading(false);
    };

    if (loading) listGoals();
  }, [loading]);


  const handleCheck = async (task) => {
    try {
      const response = await GoalsService.UpdateTask(task.id).then(
        (r) => r.data
      );
      setLoading(true);

      if (user.balance === response.balance) {
        addToast({
          type: toastType.success,
          title: "Tarefa concluida com sucesso",
          description: task.description,
        });

        return;
      }

      setTaskCompletedModalOpen(response.balance - user.balance);
      updateUser(response);
    } catch (err) {
      console.log(err);

      addToast({
        type: toastType.error,
        title: "Erro ao finalizar tarefa",
        description: task.description,
      });
    }
  };

  const progressBar = (currentExperience, experienceToNextLevel) => {
    const percentToNextLevel =
      Math.round(currentExperience * 100) / experienceToNextLevel;
    return (
      <ProgressBar>
        <div>
          <div style={{ width: `${percentToNextLevel}%` }} />
        </div>
        <span> {percentToNextLevel} %</span>
      </ProgressBar>
    );
  };

  const dateTextEnd = (start, end) => {
    return (
      format(parseISO(start), " dd 'de' MMMM ", {
        locale: ptBR,
      }) +
      format(parseISO(end), " 'até' dd 'de' MMMM ", {
        locale: ptBR,
      })
    );
  };

  return (
    <Container>
      <Header>
        <Link to="/registrationGoals">
          <strong>Criar nova Meta</strong>
        </Link>
        <Link to="/registrationAward">
          <strong>Recompensas</strong>
        </Link>
      </Header>
      <Content>
        <Schedule>
          <h1>Metas</h1>
          <Section>
            <div>
              <strong>{goals && goals.length} Metas</strong>
              <Link to="/registrationGoals">
                <FiPlus /> Criar nova meta
              </Link>
            </div>
            {loading ? (
              <div
                style={{
                  justifyContent: "center",
                  borderBottom: "none",
                }}
              >
                <Default color="#ff9000" size={200} />
              </div>
            ) : (
              <>
                {goals.length === 0 && <p>Nenhum meta cadastrada</p>}

                {goals.map((goal) => (
                  <Goals key={goal.id}>
                    {progressBar(
                      goal.tasks && goal.tasks.filter((x) => x.done).length,
                      goal.tasks && goal.tasks.length
                    )}
                    
                    <GoalsTitle>
                      <span>
                        <FiFlag size={20} />
                        {goal.title}
                      </span>
                      {dateTextEnd(goal.startDate, goal.endDate)}
                      <button onClick={() => deleteGoal(goal.id)}>
                        <FiTrash2 size={20} />
                      </button>
                    </GoalsTitle>
                    <p>{goal.description}</p>
                    <h6>Tarefas</h6>
                    {goal.tasks &&
                      goal.tasks.map((task, index) => (
                        <div>
                          <label>
                            <Checkbox
                              disabled={task.done}
                              checked={task.done}
                              onChange={() => handleCheck(task)}
                            />
                            <span style={{ marginLeft: 8 }}>
                              {task.description}
                            </span>
                          </label>
                        </div>
                      ))}
                  </Goals>
                ))}
              </>
            )}
          </Section>
          {!!isTaskCompletedModalOpen && (
            <Modal
              close={() => setTaskCompletedModalOpen(null)}
            >
              <header>
                <FaTrophy />
              </header>
              <strong>Parabéns</strong>
              <p>
                Você finalizou sua meta e acumulou {isTaskCompletedModalOpen}
                <BiCookie size={24} color="#ff9000" />.
              </p>
            </Modal>
          )}
        </Schedule>
      </Content>
    </Container>
  );
};
export default Dashboard;
