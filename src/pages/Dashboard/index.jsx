import React, { useState, useEffect } from "react";

import { useAuth } from '../../hooks/auth';
import GoalsService from "../../services/GoalsService";

import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  FiFlag,
  FiPower,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import TaskCompletedModal from "../../components/TaskCompletedModal";
import { Default } from 'react-spinners-css';
import Checkbox from '../../components/Checkbox';

import { BiCookie } from "react-icons/bi";

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Goals,
  GoalsTitle,
  ProgressBar,
  Menu
} from "./styles";


const Dashboard = () => {
  const { signOut, user, updateUser } = useAuth();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteGoal = async (id) => {
    try {
      setLoading(true);
      await GoalsService.DeleteGoal(id);
      const copyGoal = [...goals];
      setGoals(copyGoal.filter(g => g.id !== id));
      setLoading(false);

    } catch (err) { console.log(err) }
  }


  useEffect(() => {
    const listGoals = async () => {
      setLoading(true);
      setGoals([]);
      const response = await GoalsService.ListGoals().then((r) => r.data);
      setGoals(response)
      setLoading(false);
    }
    
    if(loading) listGoals();
  }, [loading])


  const [isTaskCompletedModalOpen, setTaskCompletedModalOpen] = useState(false);

  const handleCheck = async (id) => {
    try {
       const response = await GoalsService.UpdateTask(id).then((r) => r.data);

       
      updateUser(response);
      console.log(response)
      setLoading(true);
      
    } catch (err) { console.log(err) }
    //setTaskCompletedModalOpen(true);
  };


  const progressBar = (currentExperience, experienceToNextLevel) => {
    console.log(currentExperience + "-----" + experienceToNextLevel)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    return (
      <ProgressBar>
        <div>
          <div style={{ width: `${percentToNextLevel}%` }} />
        </div>
        <span> {percentToNextLevel} %</span>
      </ProgressBar>
    );
  }

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
        <HeaderContent>
          <Menu>
            <Link to="/registrationGoals">
              <strong>Criar nova Meta</strong>
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
          <h1>Metas</h1>
          <Section>
            <div>
              <strong>{goals && goals.length} Metas</strong>
              <Link to="/registrationGoals">
                <FiPlus /> Criar nova meta
              </Link>
            </div>
            {loading ?
              <div style={{
                justifyContent: "center",
                borderBottom: "none"
              }}>
                <Default color="#ff9000" size={200} />
              </div>
              :
              <>
                {goals.length === 0 && <p>Nenhum meta cadastrada</p>}

                {goals.map((goal) => (
                  <Goals key={goal.id}>
                    {progressBar(goal.tasks && goal.tasks.filter(x => x.done).length, goal.tasks && goal.tasks.length)}
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
                              onChange={() => handleCheck(task.id)}
                            />
                            <span style={{ marginLeft: 8 }}>{task.description}</span>
                          </label>
                        </div>
                      ))}
                  </Goals>
                ))}
              </>
            }
          </Section>
          {isTaskCompletedModalOpen && (
            <TaskCompletedModal
              closeTaskCompletedModal={() => setTaskCompletedModalOpen(false)}
            />
          )}
        </Schedule>
        <Profile>
          <img src={user.avatar_url} alt={user.name} />
          <div>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
          <span style={{ display: "grid" }}>
            <strong>
              Moedas acumuladas:
            </strong>
            <strong style={{ justifySelf: "center", display: "flex", alignItems: "flex-end", marginTop: "10px" }}>
              <BiCookie size={24} color="#ff9000" />
              <strong style={{ paddingLeft: "8px" }}>
                {user.balance}
              </strong>
            </strong>
          </span>
        </Profile>
      </Content>
    </Container>
  );
};
export default Dashboard;
