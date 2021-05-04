import React, { useReducer } from "react"
import teamReducer from "./teamReducer"
import TeamContext from './teamContext'
import { ADD_TEAM, GET_TEAM, GET_TEAMS, LOADING_TEAM, TEAM_ERROR } from "../types"
import { db } from "../../database"


const TeamState = (props) => {

    const initialState = {
        team: null,
        teams: [],
        error: null,
        loading: false
    }

    const [state, dispatch] = useReducer(teamReducer, initialState)

    const addTeam = async team => {
        try {

            const t = await db.collection('teams').where('name', '==', team.name).get();
            if (t.size > 0) {
                dispatch({ type: TEAM_ERROR, payload: 'name already exist' })
                return;
            }

            const teamAdded = await db.collection('teams').add({ name: team.name, userId: team.userId, players: [] })
            const data = await db.collection('teams').doc(result.id).get()
            dispatch({ type: ADD_TEAM, payload: { id: data.id, ...data.data() } })
            return teamAdded.id
        } catch (error) {
            dispatch({ type: TEAM_ERROR, payload: error.message })
        }

    }

    const getTeamByUserId = async userId => {
        try {
            dispatch({ type: LOADING_TEAM })

            const result = await db.collection('teams').where('userId', '==', userId).get()
            const teamData = []
            if (result.size > 0) {
                result.forEach(doc => {
                    if (doc.exists) {
                        teamData.push({ id: doc.id, ...doc.data() })
                    }
                })
            }
            dispatch({ type: GET_TEAM, payload: teamData[0] })
        } catch (error) {
            console.log(error)
            dispatch({ type: TEAM_ERROR, payload: error.message })
        }
    }


    const getTeams = async () => {
        try {
            setLoading()

            const result = await db.collection('teams').onSnapshot(teams => {
                const teamsData = []
                teams.forEach(t => {
                    if (t.exists) {
                        teamsData.push({ id: t.id, ...t.data() })
                    }
                })

                dispatch({ type: GET_TEAMS, payload: teamsData })
            })



            return result
        } catch (error) {
            console.log(error)
            dispatch({ type: TEAM_ERROR, payload: error.message })
        }
    }

    const addPlayerToTeamPlayers = async player => {
        try {
            console.log('PL', player)
            const team = (await db.collection('teams').doc(player.teamId).get()).data()
            await db.collection('teams').doc(player.teamId).update({ players: [...team.players, player] })
        } catch (error) {
            console.log(error)
        }
    }

    const getTeamById = async teamId => {
        try {
            dispatch({ type: LOADING_TEAM })

            const result = await db.collection('teams').doc(teamId).get()
            dispatch({ type: GET_TEAM, payload: { id: result.id, ...result.data() } })
        } catch (error) {
            console.log(error)
            dispatch({ type: TEAM_ERROR, payload: error.message })
        }
    }

    const setLoading = () => dispatch({ type: LOADING_TEAM })




    return (<TeamContext.Provider value={{
        team: state.team,
        teams: state.teams,
        error: state.error,
        loading: state.loading,
        addTeam,
        getTeamByUserId,
        getTeamById,
        getTeams,
        addPlayerToTeamPlayers,

    }}>
        {props.children}

    </TeamContext.Provider>)


}


export default TeamState

