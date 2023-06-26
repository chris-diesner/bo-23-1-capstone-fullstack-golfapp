export const setAuthenticatedUser = (user: string) => ({
    type: "SET_AUTHENTICATED_USER",
    payload: user,
});

export const clearAuthenticatedUser = () => ({
    type: "CLEAR_AUTHENTICATED_USER",
});
