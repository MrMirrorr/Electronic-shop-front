import { USER_ROLE } from '../../constants';

export const selectIsAdmin = (state) => {
	if (state.auth.user) {
		return state.auth.user.roleId === USER_ROLE.ADMIN;
	}
};
