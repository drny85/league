import { GET_TEAM, GET_TEAMS, LOADING_TEAM, TEAM_ERROR } from "../types";

export default (state, { type, payload }) => {
    switch (type) {

        case GET_TEAM:
            return {
                ...state,
                team: payload,
                loading: false,
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: payload,
                loading: false,
                error: null,
            };

        case TEAM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        case LOADING_TEAM:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};
