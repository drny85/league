
import React, { useReducer } from "react"
import gameReducer from "./gameReducer"
import GameContext from './gameContext'
import { db } from "../../database"
import { games } from "../../data"
import { GET_GAME, GET_GAMES, LOADING_GAME } from "../types"




const GameState = ({ children }) => {
    const initialState = {
        game: null,
        games: [],
        loadingGame: false,
        error: null,
    }

    const [state, dispatch] = useReducer(gameReducer, initialState)

    const addGame = async (gameData) => {
        try {
            await db.collection('games').add(gameData)
        } catch (error) {
            console.log(error)
        }
    }

    const getGames = async () => {
        try {
            await db.collection('games').onSnapshot(snap => {
                const gamesData = []
                snap.forEach(game => {
                    if (game.exists) {
                        gamesData.push({ id: game.id, ...game.data() })
                    }
                })

                dispatch({ type: GET_GAMES, payload: gamesData })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getGameById = async (gameId) => {
        try {
            dispatch({ type: LOADING_GAME })

            const result = await db.collection('games').doc(gameId).get()
            dispatch({ type: GET_GAME, payload: { id: result.id, ...result.data() } })
        } catch (error) {
            console.log(error)
        }
    }

    const updateGame = async (gameData) => {
        try {
            await db.collection('games').doc(gameData.id).set(gameData)

            console.log('YES')
            return true
        } catch (error) {
            console.log(error)
        }
    }

    return <GameContext.Provider value={{
        game: state.game,
        games: state.games,
        loadingGame: state.loadingGame,
        error: state.error,
        addGame,
        getGameById,
        getGames,
        updateGame,
    }}>
        {children}
    </GameContext.Provider>


}



export default GameState