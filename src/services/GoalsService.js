import api from './api';

class GoalsService {
  async ListGoals() {
    const response = await api.get('goals');
    return response;
  }

  async CreateGoals(
    title,
    description,
    points,
    startDate,
    endDate,
    tasks) {
    const response = await api.post('goals',{
      title,
      description,
      points,
      startDate,
      endDate,
      tasks
    });
    return response;
  }

  async DeleteGoal(id) {
    const response = await api.delete(`goals/${id}`);
    return response;
  }

  async UpdateTask(id) {
    const response = await api.patch(`goals/${id}`);
    console.log(response)
    return response;
  }
}

export default new GoalsService();