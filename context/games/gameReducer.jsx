import { GET_GAME, GET_GAMES, LOADING_GAME } from "../types";

export default (state, { type, payload }) => {
    switch (type) {

        case GET_GAME:
            return {
                ...state,
                game: payload,
                loadingGame: false,
            };

        case GET_GAMES:
            return {
                ...state,
                games: payload,
                loadingGame: false,
                error: null,
            };

        case LOADING_GAME:
            return {
                ...state,
                loadingGame: true,
                error: null
            }

        default:
            return state;
    }
};
