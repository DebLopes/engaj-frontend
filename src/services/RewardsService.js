import api from './api';

class RewardsService {
	async ListReward() {
		const response = await api.get('rewards');
		return response;
	}

	async CreateReward(
		description,
		value) {
		const response = await api.post('rewards', {
			description,
			value
		});
		return response;
	}

	async RecueAward(id){
		const response = await api.patch(`rewards/${id}`);
		return response;
	}

}
export default new RewardsService();