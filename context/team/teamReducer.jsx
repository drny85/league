import { GET_TEAM, GET_TEAMS, LOADING_TEAM, TEAM_ERROR } from "../types";

export default (state, { type, payload }) => {
    switch (type) {

        case GET_TEAM:
            return {
                ...state,
                team: payload,
                loadingTeam: false,
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: payload,
                loadingTeam: false,
                error: null,
            };

        case TEAM_ERROR:
            return {
                ...state,
                error: payload,
                loadingTeam: false,
            };

        case LOADING_TEAM:
            return {
                ...state,
                loadingTeam: true,
            };

        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
                loadingTeam: false
            }

        default:
            return state;
    }
};
