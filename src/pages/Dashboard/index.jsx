import React, { useState, useEffect } from "react";

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
import LevelUpModal from "../../components/LevelUpModal";
import Button from "../../components/Button";
import { Form } from "@unform/web";
import * as Yup from "yup";

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


const user = {
  name: "Débora Silva Santos Lopes",
  avatar_url:
    "https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-mulher-no-icone-redondo_24640-14048.jpg",
};


const Dashboard = () => {

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const listGoals = async () => {
      const response = await GoalsService.ListGoals().then((r) => r.data);
      setGoals(response)
    }

    listGoals();
  }, [])


  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const handleCheck = (goal, id) => {
    console.log(goal);
    setIsLevelUpModalOpen(true);
  };


  const progressBar = (currentExperience, experienceToNextLevel) => {
    console.log(currentExperience + "-----" + experienceToNextLevel)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    return (
      <ProgressBar>
        <div>
          <div style={{ width: `${percentToNextLevel}%` }} />
        </div>
        <span> {currentExperience} %</span>
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
          <button type="button">
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
                  {/* <button>
                    <FiEdit3 size={20} />
                  </button> */}
                  <button>
                    <FiTrash2 size={20} />
                  </button>
                </GoalsTitle>

                <p>{goal.description}</p>
                <h6>Tarefas</h6>

                {goal.tasks &&
                  goal.tasks.map((task, index) => (
                    <div>
                      <input
                        type="checkbox"
                        disabled={task.done}
                        checked={task.done || null}
                        onChange={() => handleCheck(goal.id, task.id)}
                      ></input>
                      <strong> {`${index + 1} - ${task.description}`}</strong>
                    </div>
                  ))}
              </Goals>
            ))}
          </Section>
          {isLevelUpModalOpen && (
            <LevelUpModal
              level={2}
              closeLevelUpModal={() => setIsLevelUpModalOpen(false)}
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
          <strong>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eleifend nec velit varius pharetra. Vivamus at orci non nibh
            sollicitudin aliquam. In hac habitasse platea dictumst. Nam
            ullamcorper justo ac urna fringilla, a congue ipsum pharetra.
          </strong>
        </Profile>
      </Content>
    </Container>
  );
};
export default Dashboard;
