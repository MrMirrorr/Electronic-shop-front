export const selectIsAdmin = (state) => {
	if (state.auth.user) {
		return state.auth.user.roleId === 0;
	}
};
