import React, { useReducer } from "react"
import playerReducer from "./playerReducer"
import PlayerContext from './playerContext'
import { ADD_PLAYER, GET_PLAYER, GET_PLAYERS, PLAYER_ERROR, LOADING_PLAYERS } from "../types"
import { db } from "../../database"




const PlayerState = (props) => {

    const initialState = {
        player: null,
        players: [],
        error: null,
        loading: false
    }

    const [state, dispatch] = useReducer(playerReducer, initialState)

    const addPlayer = async playerData => {
        try {
            const result = await db.collection('players').add(playerData)
            const data = await db.collection('players').doc(result.id).get()
            dispatch({ type: ADD_PLAYER, payload: { id: data.id, ...data.data() } })
            return { id: data.id, ...data.data() }
        } catch (error) {
            dispatch({ type: PLAYER_ERROR, payload: error.message })
        }
    }

    const getPlayersByTeamId = async teamId => {
        try {
            setLoading()
            console.log(teamId)
            const result = await db.collection('players').where('teamId', '==', teamId).onSnapshot(
                players => {
                    const playersData = []
                    players.forEach(player => {
                        playersData.push({ id: player.id, ...player.data() })
                    })

                    dispatch({ type: GET_PLAYERS, payload: playersData })

                })

            return result

        } catch (error) {
            console.log(error)
            dispatch({ type: PLAYER_ERROR, payload: error.message })
        }
    }

    const getPlayerById = async playerId => {
        try {
            const result = await db.collection('players').doc(playerId).get()
            dispatch({ type: GET_PLAYER, payload: { id: result.id, ...result.data() } })
        } catch (error) {
            console.log(error)
            dispatch({ type: PLAYER_ERROR, payload: error.message })
        }
    }

    const setLoading = () => dispatch({ type: LOADING_PLAYERS })




    return (<PlayerContext.Provider value={{
        player: state.player,
        players: state.players,
        error: state.error,
        loading: state.loading,
        getPlayerById,
        getPlayersByTeamId,
        addPlayer


    }}>
        {props.children}

    </PlayerContext.Provider>)


}


export default PlayerState

