import { GET_PLAYER, GET_PLAYERS, LOADING_PLAYERS, PLAYER_ERROR, } from "../types";

export default (state, { type, payload }) => {
    switch (type) {

        case GET_PLAYER:
            return {
                ...state,
                player: payload,
                loading: false,
            };

        case GET_PLAYERS:
            return {
                ...state,
                players: payload,
                loading: false,
                error: null,
            };

        case PLAYER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        case LOADING_PLAYERS:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};
