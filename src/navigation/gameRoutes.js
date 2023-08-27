import {
	Home,
	Landing,
	GamePreview,
	Preview,
	ProfilePage,
	CreateShareEarn,
	Portfolio,
	BottomNavigation
} from '../screens';
export default [
	{
		name: 'Home',

		component: Home
	},
	{
		name: 'Landing',
		component: BottomNavigation
	},
	{
		name: 'GamePreview',
		component: GamePreview
	},
	{
		name: 'Preview',
		component: Preview
	},
	{
		name: 'ProfilePage',
		component: ProfilePage
	},
	{
		name: 'CreateShareEarn',
		component: CreateShareEarn
	},
	{
		name: 'Portfolio',
		component: Portfolio
	}
	// {
	// 	name: 'TabsBelowCards',
	// 	component: TabsBelowCards
	// }
	// {
	// 	name: 'BottomNavigation',
	// 	component: BottomNavigation
	// }
];
