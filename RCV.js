// Vald Candidates
var pete = "Pete Buttigieg";
var steyer = "Tom Steyer";
var warren = "Elizabeth Warren";
var biden = "Joe Biden";
var klobuchar = amy = "Amy Klobuchar";
var yang = "Andrew Yang";
var bernie = sanders = "Bernie Sanders";
var gabbard = tulsi = "Tulsi Gabbard";
var chafee = "Lincoln Chafee";
var hawkins = "Howie Hawkins";
var patrick = "Deval Patrick";
var bennet = "Michael Bennet";
var bloomberg = "Michael Bloomberg";
var delaney = "John Delaney";
// Invalid Candidates
var oprah = null;//"Oprah Winfrey";
var brown = null;//"Jerry Brown";
var carter = null;//"Jimmy Carter";
var jackson = null;//"Jesse Jackson";
var kennedy = null;//"Bobby Kennedy";
var wellstone = null;//"Paul Wellstone";
var harris = null;//"Kamala Harris";
var booker = null;//"Corey Booker";
var bullock = null;//"Steve Bullock";



function getNewBallotContext(config) {
	return {
		'name': config.name || null,
		'ballotChoices': config.choices || [],
		'currentCandidate': null,
		'candidateScores1': 0,
	};
}


var ballots = [
  // Example Simulation from discussion with Caleb
  getNewBallotContext({name: 'Person 1', choices: [biden]}),
  getNewBallotContext({name: 'Person 2', choices: [biden]}),
  getNewBallotContext({name: 'Person 3', choices: [bernie]}),
  getNewBallotContext({name: 'Person 4', choices: [bernie, pete, warren, steyer, klobuchar, yang, gabbard, bloomberg, biden]}),

  // Example Simulation from Dakota's FB Post
  // getNewBallotContext({name: 'DH', choices: [pete, steyer, warren, biden, klobuchar]}),
  // getNewBallotContext({name: 'MB', choices: [biden, steyer, yang]}),
  // getNewBallotContext({name: 'JM', choices: [sanders]}),
  // getNewBallotContext({name: 'CB', choices: [sanders]}),
  // getNewBallotContext({name: 'BBH', choices: [pete, steyer, yang, biden, sanders]}),
  // getNewBallotContext({name: 'MP', choices: [sanders, gabbard, yang, chafee, hawkins]}),
  // getNewBallotContext({name: 'SF', choices: [pete]}),
  // getNewBallotContext({name: 'DS', choices: [pete, warren, yang]}),
  // getNewBallotContext({name: 'ES', choices: [klobuchar, pete, biden, warren, steyer, yang]}),
  // getNewBallotContext({name: 'ST', choices: [sanders, warren, yang]}),
  // getNewBallotContext({name: 'BF', choices: [pete, amy, patrick, bennet, biden]}),
  // getNewBallotContext({name: 'LR', choices: [warren]}),
  // getNewBallotContext({name: 'PB', choices: [pete, amy, bennet, warren, biden]}),
  // getNewBallotContext({name: 'CHII', choices: [pete, amy, steyer]}),
  // getNewBallotContext({name: 'AS', choices: [pete, klobuchar, biden]}),
  // getNewBallotContext({name: 'MC', choices: [pete, warren, bernie, biden, yang]}),
  // getNewBallotContext({name: 'JE', choices: [pete, amy, biden, warren, bennet]}),
  // getNewBallotContext({name: 'ME', choices: [warren, amy, pete]}),
  // getNewBallotContext({name: 'CMI', choices: [pete, warren, biden, bernie, klobuchar]}),
  // getNewBallotContext({name: 'SL', choices: [pete, bernie, warren, yang, klobuchar]}),
  // getNewBallotContext({name: 'DC', choices: [klobuchar, warren, steyer, pete, bloomberg]}),
  // getNewBallotContext({name: 'MK', choices: [sanders, warren, yang, klobuchar, biden]}),
  // getNewBallotContext({name: 'MMS', choices: [sanders, yang]}),
  // getNewBallotContext({name: 'DL', choices: [biden, warren, bloomberg, klobuchar, pete]}),
  // getNewBallotContext({name: 'CK', choices: [biden, warren, pete, bullock, bernie]}),
  // getNewBallotContext({name: 'AR', choices: [bernie, warren, yang, steyer, klobuchar, biden, bloomberg, pete]}),
  // getNewBallotContext({name: 'CM', choices: [bernie]}),
  // getNewBallotContext({name: 'TS', choices: [sanders, warren]}),
  // getNewBallotContext({name: 'JM', choices: [bernie, warren, harris, booker, yang]}),
  // getNewBallotContext({name: 'JC', choices: [warren]}),
  // getNewBallotContext({name: 'JM', choices: [sanders, warren, yang, amy, biden]}),
  // getNewBallotContext({name: 'SSP', choices: [sanders, warren, pete, tulsi, oprah]}),
  // getNewBallotContext({name: 'CWK', choices: [sanders, warren, yang]}),
  // getNewBallotContext({name: 'SSP', choices: [brown, carter, jackson, kennedy, wellstone]}),
  // getNewBallotContext({name: 'RMN ', choices: [klobuchar, biden, warren, steyer, pete]}),
  // getNewBallotContext({name: 'WK', choices: [amy, steyer, klobuchar]}),
  // getNewBallotContext({name: 'JH', choices: [bernie]}),
  // getNewBallotContext({name: 'MH', choices: [warren, sanders, biden, klobuchar, pete]}),
  // getNewBallotContext({name: 'WK', choices: [pete, steyer, warren, biden, klobuchar, yang, gabbard, bloomberg, bernie]}),
  // getNewBallotContext({name: 'RT', choices: [pete, steyer, warren, klobuchar, biden, sanders]}),
  // getNewBallotContext({name: 'SM', choices: [pete, klobuchar, warren, steyer, sanders, biden]}),
  // getNewBallotContext({name: 'GMS', choices: [sanders, warren, klobuchar, pete, steyer]}),
  // getNewBallotContext({name: 'SY', choices: [pete, klobuchar, warren]}),
  // getNewBallotContext({name: 'SB', choices: [gabbard, bernie, yang, chafee]}),
  // getNewBallotContext({name: 'DB', choices: [yang, bernie, warren, pete, delaney]}),
  // getNewBallotContext({name: 'ZJ', choices: [warren, steyer, pete, biden, bernie]}),
  // getNewBallotContext({name: 'MW', choices: [pete, warren, klobuchar, biden, sanders]}),
  // getNewBallotContext({name: 'PAF', choices: [bernie, yang, warren, steyer, klobuchar]}),
  // getNewBallotContext({name: 'KG', choices: [pete, patrick, klobuchar, bennet, biden]}),
  // getNewBallotContext({name: 'SB', choices: [pete]}),


  // getNewBallotContext({name: '', choices: []}),
];

function processBallots(ballots) {

	var simpleMajority = Math.floor(ballots.length/2.0)+1;
	var resultContext = {
		'simpleMajority': simpleMajority,
		'rounds': {},
		'ballots': ballots,
	};

	var voteSwitches = {};
	resultContext.voteSwitches = voteSwitches;

	var candidateScores1 = {
		'__TOTAL': 0,
	};
	resultContext.candidateScores1 = candidateScores1;
	var candidateScores2 = {
		'__TOTAL': 0,
	};
	resultContext.candidateScores2 = candidateScores2;


	// Pre-process the Ballots
	var candidatesList = [];
	for (var ballotIdx = 0; ballotIdx < ballots.length; ballotIdx++) {
		var currentBallot = ballots[ballotIdx];
		for (var choiceIdx = 0; choiceIdx < currentBallot.ballotChoices.length; choiceIdx++) {
			var option = currentBallot.ballotChoices[choiceIdx];
			if (option === null) continue;

			// Generate  full list of candidates
			if (candidatesList.indexOf(option) === -1) candidatesList.push(option);

			// Calculate Candidate Score #1 -- Score gives each choice progressively lower score, but doesn't 
			// limit the total contributable by each ballot, arguably favoring ballots with more choices.
			if (!candidateScores1[option]) candidateScores1[option] = 0;
			var score1 = (1/(choiceIdx+2));
			candidateScores1[option] += score1;
			candidateScores1['__TOTAL'] += score1;
			currentBallot.candidateScores1 += score1;

			// Calculate Candidate Score #2 -- Score gives each ballot exactly one point of weight, 
			// distributed in progressively halfing value (4/7, 2/7, 1/7, for 3 candidates, etc).  However,
			// the n-round weight of each candidate is worth more with less choices listed, arguably 
			// favoring ballots with fewer choices.
			if (!candidateScores2[option]) candidateScores2[option] = 0;
			var denominator = Math.pow(2,currentBallot.ballotChoices.length)-1;
			var numerator = Math.pow(2, (currentBallot.ballotChoices.length-choiceIdx)-1);
			// console.log('num:', numerator, 'den', denominator);
			var score2 = numerator/denominator;
			candidateScores2[option] += score2;
			candidateScores2['__TOTAL'] += score2; // SO MUCH ROUNDING ERROR ACCUMULATION!!

			// TODO: Calculate Candidate Score #3 -- Like score #1, but all un-listed candidates on the ballot get score equivalent to being last place on the ballot

			// TODO: Calculate Candidate Score #4 -- Like score #1, but all un-listed candidates on the ballot get score equivalent to un-allocated portion of total potential score divided amongst all unlisted candidates

			// TODO: Calculate Candidate Score #5 -- Like score #3, but last place on the ballot is worth 0 points (therefore all unlisted candidates implicitly get last-place score)
		}
	}
	candidatesList.sort();
	resultContext.candidatesList = candidatesList;
	var eliminatedCandidates = [];
	resultContext.eliminatedCandidates = eliminatedCandidates;

	var roundIndex = 1;
	while (true) {
		var ballotCount = {};
		for (var candidateIdx = 0; candidateIdx < candidatesList.length; candidateIdx++) {
			var option = candidatesList[candidateIdx];
			if (eliminatedCandidates.indexOf(option) === -1) ballotCount[option] = 0;
		}

		// Add Up the ballots
		for (var ballotIdx = 0; ballotIdx < ballots.length; ballotIdx++) {
			var currentBallot = ballots[ballotIdx];
			for (var choiceIdx = 0; choiceIdx < currentBallot.ballotChoices.length; choiceIdx++) {
				var option = currentBallot.ballotChoices[choiceIdx];
				if (option !== null && eliminatedCandidates.indexOf(option) === -1) {
					if (currentBallot.currentCandidate !== null && currentBallot.currentCandidate !== option) {
						var switchKey = currentBallot.currentCandidate+"->"+option;
						if (!voteSwitches[switchKey]) voteSwitches[switchKey] = 0;
						voteSwitches[switchKey]++;
					}
					currentBallot.currentCandidate = option;
					ballotCount[option] += 1;
					break;
				}
			}
		}

		// Find the Top/Bottom counts
		var top = [];
		var topCount = 0;
		var bottom = [];
		var bottomCount = Infinity;
		for (var ballotKey in ballotCount) {
			var count = ballotCount[ballotKey];
			if (count > topCount) {
				top = [];
				topCount = count;
			}
			if (count === topCount) top.push(ballotKey);
			if (count < bottomCount) {
				bottom = [];
				bottomCount = count;
			}
			if (count === bottomCount) bottom.push(ballotKey);
		}

		ballotCount['__top'] = top;
		ballotCount['__topCount'] = topCount;
		ballotCount['__bottom'] = bottom;
		ballotCount['__bottomCount'] = bottomCount;
		resultContext.rounds[roundIndex] = ballotCount;

		// End If there's a simple majority candidate
		if (topCount >= simpleMajority) {
			resultContext.winner = top[0];
			resultContext.electionResult = "Winner by Outright Majority";
			return resultContext;
		}

		if (topCount === bottomCount) {
			if (top.length === 1) {
				// End if there is only one candidate left
				resultContext.winner = top[0];
				resultContext.electionResult = "Winner by Simple Majority";
				return resultContext;
			} else {
				// End if there is a tie
				resultContext.electionResult = "Tie vote";
				resultContext.winner = null;
				resultContext.winners = top;
				return resultContext;
			}
		}

		// Otherwise, remove the bottom candidates and try again
		for (var bottomIdx = 0; bottomIdx < bottom.length; bottomIdx++) eliminatedCandidates.push(bottom[bottomIdx]);

		roundIndex++;
	}
}
processBallots(ballots);