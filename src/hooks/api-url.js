import {useSelector} from 'react-redux';
import {API_URL, GAME_API_URL} from '../utils/endpoints';

const useApiUrl = () => {
	const isUserInGame = useSelector(state => state.global.isUserInGame);

	if (isUserInGame) {
		return GAME_API_URL;
	} else {
		return API_URL;
	}
};

export default useApiUrl;
