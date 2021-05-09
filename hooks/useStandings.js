import { useEffect, useContext, useState } from 'react';
import gameContext from '../context/games/gameContext';
import teamContext from '../context/team/teamContext';

export const useStandings = () => {
	const { games, getGames } = useContext(gameContext);
	const { teams, getTeams } = useContext(teamContext);
	const [standings, setStandings] = useState([]);
	const stand = {};

	const calculateStangings = () => {
		teams.forEach((team) => {
			stand[team.name] = { wins: 0, losses: 0 };
			games.forEach((game) => {
				if (game.completed) {
					if (game.winnerId === team.id) {
						stand[team.name].wins++;
					}
					if (game.loserId === team.id) {
						stand[team.name].losses++;
					}
				}
			});
		});

		const data = [];
		Object.entries(stand).forEach((s, i) =>
			data.push({ teamName: s[0], wins: s[1].wins, losses: s[1].losses })
		);
		data.sort((a, b) => parseInt(b.wins) - parseInt(a.wins));
		setStandings(data);
	};
	useEffect(() => {
		games.length === 0 && getGames();
		teams.length === 0 && getTeams();
		calculateStangings();
		return () => {};
	}, [games.length]);

	return standings;
};
