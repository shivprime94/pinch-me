import {
	GoogleSignin,
	statusCodes
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {updateUser} from '../store/global';
import {putUser} from '../store/global/actions';

const useGoogleLogin = () => {
	const dispatch = useDispatch();

	const createPinchProfile = user => {
		dispatch(putUser(user));
	};

	const initializeGoogleLogin = () => {
		GoogleSignin.configure({
			androidClientId:
				'450151167377-prp14d9f8fp7rb695r0ga0okvhpcd0dh.apps.googleusercontent.com'
		});
		GoogleSignin.hasPlayServices()
			.then(hasPlayService => {
				if (hasPlayService) {
					GoogleSignin.signIn()
						.then(userInfo => {
							const {name, email} = userInfo.user;
							GoogleSignin.getTokens().then(response => {
								const {accessToken} = response;
								const pinchUser = {
									full_name: name,
									email,
									email_auth_token: accessToken
								};
								createPinchProfile({
									user: pinchUser
								});
							});
						})
						.catch(error => {
							console.log(
								'Unable to signin',
								JSON.stringify(error)
							);
						});
					// GoogleSignin.getTokens().then(response => {
					// 	const {accessToken} = response;
					// 	try {
					// 		if (accessToken) {
					// 			dispatch(updateUser({accessToken}));

					// 		}
					// 	} catch (error) {
					// 		throw new Error('Unable to signin: ', error);
					// 	}
					// });
				}
			})
			.catch(error => {
				console.log(
					'Error when checking play services: ',
					JSON.stringify(error)
				);
			});
	};

	return initializeGoogleLogin;
};

export default useGoogleLogin;
