function getNewPlayer(skill) {
	var p = {
		'skill': skill || 1.0,
		'games': 0,
		'wins': 0,
		'losses': 0,
	};
	return p;
}

var players = [
	getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), // 10x
	getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), // 10x
	getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), // 10x
	getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), // 10x

	// getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), getNewPlayer(), // 10x
	getNewPlayer(10), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), getNewPlayer(3), // 10x
];

var NUM_PLAYERS_PER_GAME = 10;
var NUM_GAMES = 100;

for (var idxGames = 0; idxGames < NUM_GAMES; idxGames++) {
	// Randomly select players
	var gamePlayers = [];
	for (var idxPlayerSelect = 0; idxPlayerSelect < NUM_PLAYERS_PER_GAME; idxPlayerSelect++) {
		var idx = Math.floor(Math.random()*players.length);
		var pl = players[idx];
		if (gamePlayers.includes(pl)) {
			idxPlayerSelect--;
			continue;
		}
		gamePlayers.push(pl);
	}

	// Select a winner
	var skillSum = 0;
	for (var idxGamePlayers = 0; idxGamePlayers < gamePlayers.length; idxGamePlayers++) {
		var pl = gamePlayers[idxGamePlayers];
		skillSum += pl['skill'];
		pl['games']++;
		pl['losses']++;
	}
	var winnerSkill = Math.random()*skillSum;

	for (var idxGamePlayers = 0; idxGamePlayers < gamePlayers.length; idxGamePlayers++) {
		var pl = gamePlayers[idxGamePlayers];
		winnerSkill -= pl['skill'];

		if (winnerSkill <= 0) {
			pl['wins']++;
			pl['losses']--;
			break;
		}
	}
}