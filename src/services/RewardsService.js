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

}
export default new RewardsService();