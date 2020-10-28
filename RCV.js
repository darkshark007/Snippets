function getNewBallotContext(config) {
	return {
		'name': config.name || null,
		'ballotChoices': config.choices || [],
		'currentCandidate': null,
		'candidateScores1': 0,
	};
}


/* Template
	// Valid Candidates
	var can1 = "";

	var ballots = [
		getNewBallotContext({name: 'E', choices: [can1]}),
	];
// */


/* Standard RCV Elimination of Popular Candidate Scenario -- Degenerate Edge Case
	// Valid Candidates
	var popularCandidate = "Popular Candidate";
	var can1 = "Candidate #1";
	var can2 = "Candidate #2";
	var can3 = "Candidate #3";
	var can4 = "Candidate #4";
	var can5 = "Candidate #5";
	var can6 = "Candidate #6";
	var can7 = "Candidate #7";
	var can8 = "Candidate #8";

	var ballots = [
		getNewBallotContext({name: 'V1', choices: [can1,popularCandidate,can2,can3,can4,can5,can6,can7,can8,]}),
		getNewBallotContext({name: 'V2', choices: [can2,popularCandidate,can3,can4,can5,can6,can7,can8,can1,]}),
		getNewBallotContext({name: 'V3', choices: [can3,popularCandidate,can4,can5,can6,can7,can8,can1,can2,]}),
		getNewBallotContext({name: 'V4', choices: [can4,popularCandidate,can5,can6,can7,can8,can1,can2,can3,]}),
		getNewBallotContext({name: 'V5', choices: [can5,popularCandidate,can6,can7,can8,can1,can2,can3,can4,]}),
		getNewBallotContext({name: 'V6', choices: [can6,popularCandidate,can7,can8,can1,can2,can3,can4,can5,]}),
		getNewBallotContext({name: 'V7', choices: [can7,popularCandidate,can8,can1,can2,can3,can4,can5,can6,]}),
		getNewBallotContext({name: 'V8', choices: [can8,popularCandidate,can1,can2,can3,can4,can5,can6,can7,]}),
	];
// */

/* RCV Experiment1 Tie Vote Scenario -- Degenerate Edge Case
	// Valid Candidates
	var tie1 = "Tie 1";
	var tie2 = "Tie 2";
	var can3 = "Candidate #3";
	var can4 = "Candidate #4";
	var can5 = "Candidate #5";

	var ballots = [
		getNewBallotContext({name: 'A', choices: [tie1,tie2,can3,]}),
		getNewBallotContext({name: 'B', choices: [tie1,tie2,can4,]}),
		getNewBallotContext({name: 'C', choices: [tie2,tie1,can5,]}),
		getNewBallotContext({name: 'D', choices: [can3,can4,can5,]}),
	];
// */

//* Book Club Book Decision Vote, 10/25/2020
	// Valid Candidates
	var solzhenitsyn = "LIVE NOT BY LIES";
	var hayek = "The Road to Serfdom";
	var rushkoff = "Team Human";
	var nours = "The Blade Runner";
	var robinson =  "Why Nations Fail";
	var stiglitz = "People, Power, and Profits";
	var bastiat = "The Law";
	var hazlitt = "Economics in One Lesson";
	var wheelan = "Naked Economics: Undressing the Dismal Science";
	var sowell =  "Basic Economics";

	var ballots = [
		getNewBallotContext({name: 'Stephen', choices: [solzhenitsyn,hayek,rushkoff,nours,robinson,stiglitz,bastiat,hazlitt,wheelan,sowell]}),
		// getNewBallotContext({name: 'Andrew', choices: []}),
		getNewBallotContext({name: 'Wade', choices: [robinson,nours,stiglitz,rushkoff,hayek,solzhenitsyn,bastiat,hazlitt,wheelan,sowell]}),
		getNewBallotContext({name: 'Will', choices: [hayek, rushkoff, robinson]}),
	];
// */

/* Book Club Book Decision Vote, 09/27/2020
	// Valid Candidates
	var zizek = "Like a Thief in Broad Daylight";
	var strawson = "Freedom and Resentment";
	var vonnegut = "Harrison Bergeron";
	var kolk = "The Body Keeps the Score";
	var rushkoff = "Team Human";
	var gladwell = "The Tipping Point";

	var ballots = [
		getNewBallotContext({name: 'Wade', choices: [rushkoff, zizek, vonnegut, gladwell, strawson, kolk]}),
		getNewBallotContext({name: 'Andrew', choices: [zizek, gladwell, rushkoff]}),
		getNewBallotContext({name: 'Stephen', choices: [vonnegut, zizek, gladwell, strawson, rushkoff, kolk]}),
		getNewBallotContext({name: 'Will', choices: [zizek, rushkoff, gladwell, kolk, strawson, vonnegut]}),
		// getNewBallotContext({name: 'Angel', choices: [gladwell, kolk, rushkoff, vonnegut, strawson, zizek]}),
	];
// */

/* Democratic Primary Vote 06/10/2020 - Example Simulation from discussion with Caleb
	// Valid Candidates
	var biden = "Joe Biden";
	var bernie = sanders = "Bernie Sanders";
	var pete = "Pete Buttigieg";
	var steyer = "Tom Steyer";
	var warren = "Elizabeth Warren";
	var klobuchar = amy = "Amy Klobuchar";
	var yang = "Andrew Yang";
	var gabbard = tulsi = "Tulsi Gabbard";
	var bloomberg = "Michael Bloomberg";

	var ballots = [
	  getNewBallotContext({name: 'Person 1', choices: [biden]}),
	  getNewBallotContext({name: 'Person 2', choices: [biden]}),
	  getNewBallotContext({name: 'Person 3', choices: [bernie]}),
	  getNewBallotContext({name: 'Person 4', choices: [bernie, pete, warren, steyer, klobuchar, yang, gabbard, bloomberg, biden]}),
	]
// */

/* Democratic Primary Vote, 01/14/2020 - Example Simulation from Dakota's FB Post
	// Valid Candidates
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

	var ballots = [
	  getNewBallotContext({name: 'DH', choices: [pete, steyer, warren, biden, klobuchar]}),
	  getNewBallotContext({name: 'MB', choices: [biden, steyer, yang]}),
	  getNewBallotContext({name: 'JM', choices: [sanders]}),
	  getNewBallotContext({name: 'CB', choices: [sanders]}),
	  getNewBallotContext({name: 'BBH', choices: [pete, steyer, yang, biden, sanders]}),
	  getNewBallotContext({name: 'MP', choices: [sanders, gabbard, yang, chafee, hawkins]}),
	  getNewBallotContext({name: 'SF', choices: [pete]}),
	  getNewBallotContext({name: 'DS', choices: [pete, warren, yang]}),
	  getNewBallotContext({name: 'ES', choices: [klobuchar, pete, biden, warren, steyer, yang]}),
	  getNewBallotContext({name: 'ST', choices: [sanders, warren, yang]}),
	  getNewBallotContext({name: 'BF', choices: [pete, amy, patrick, bennet, biden]}),
	  getNewBallotContext({name: 'LR', choices: [warren]}),
	  getNewBallotContext({name: 'PB', choices: [pete, amy, bennet, warren, biden]}),
	  getNewBallotContext({name: 'CHII', choices: [pete, amy, steyer]}),
	  getNewBallotContext({name: 'AS', choices: [pete, klobuchar, biden]}),
	  getNewBallotContext({name: 'MC', choices: [pete, warren, bernie, biden, yang]}),
	  getNewBallotContext({name: 'JE', choices: [pete, amy, biden, warren, bennet]}),
	  getNewBallotContext({name: 'ME', choices: [warren, amy, pete]}),
	  getNewBallotContext({name: 'CMI', choices: [pete, warren, biden, bernie, klobuchar]}),
	  getNewBallotContext({name: 'SL', choices: [pete, bernie, warren, yang, klobuchar]}),
	  getNewBallotContext({name: 'DC', choices: [klobuchar, warren, steyer, pete, bloomberg]}),
	  getNewBallotContext({name: 'MK', choices: [sanders, warren, yang, klobuchar, biden]}),
	  getNewBallotContext({name: 'MMS', choices: [sanders, yang]}),
	  getNewBallotContext({name: 'DL', choices: [biden, warren, bloomberg, klobuchar, pete]}),
	  getNewBallotContext({name: 'CK', choices: [biden, warren, pete, bullock, bernie]}),
	  getNewBallotContext({name: 'AR', choices: [bernie, warren, yang, steyer, klobuchar, biden, bloomberg, pete]}),
	  getNewBallotContext({name: 'CM', choices: [bernie]}),
	  getNewBallotContext({name: 'TS', choices: [sanders, warren]}),
	  getNewBallotContext({name: 'JM', choices: [bernie, warren, harris, booker, yang]}),
	  getNewBallotContext({name: 'JC', choices: [warren]}),
	  getNewBallotContext({name: 'JM', choices: [sanders, warren, yang, amy, biden]}),
	  getNewBallotContext({name: 'SSP', choices: [sanders, warren, pete, tulsi, oprah]}),
	  getNewBallotContext({name: 'CWK', choices: [sanders, warren, yang]}),
	  getNewBallotContext({name: 'SSP', choices: [brown, carter, jackson, kennedy, wellstone]}),
	  getNewBallotContext({name: 'RMN ', choices: [klobuchar, biden, warren, steyer, pete]}),
	  getNewBallotContext({name: 'WK', choices: [pete, steyer, klobuchar]}),
	  getNewBallotContext({name: 'JH', choices: [bernie]}),
	  getNewBallotContext({name: 'MH', choices: [warren, sanders, biden, klobuchar, pete]}),
	  getNewBallotContext({name: 'WK', choices: [pete, steyer, warren, biden, klobuchar, yang, gabbard, bloomberg, bernie]}),
	  getNewBallotContext({name: 'RT', choices: [pete, steyer, warren, klobuchar, biden, sanders]}),
	  getNewBallotContext({name: 'SM', choices: [pete, klobuchar, warren, steyer, sanders, biden]}),
	  getNewBallotContext({name: 'GMS', choices: [sanders, warren, klobuchar, pete, steyer]}),
	  getNewBallotContext({name: 'SY', choices: [pete, klobuchar, warren]}),
	  getNewBallotContext({name: 'SB', choices: [gabbard, bernie, yang, chafee]}),
	  getNewBallotContext({name: 'DB', choices: [yang, bernie, warren, pete, delaney]}),
	  getNewBallotContext({name: 'ZJ', choices: [warren, steyer, pete, biden, bernie]}),
	  getNewBallotContext({name: 'MW', choices: [pete, warren, klobuchar, biden, sanders]}),
	  getNewBallotContext({name: 'PAF', choices: [bernie, yang, warren, steyer, klobuchar]}),
	  getNewBallotContext({name: 'KG', choices: [pete, patrick, klobuchar, bennet, biden]}),
	  getNewBallotContext({name: 'SB', choices: [pete]}),
	  getNewBallotContext({name: '', choices: []}),
	];
// */

function processBallots(ballots) {

	var simpleMajority = Math.floor(ballots.length/2.0)+1;
	var resultContext = {
		'simpleMajority': simpleMajority,
		'ballots': ballots,
		'results': {},
	};

	var candidateScores1 = {
		'__TOTAL': 0,
	};
	var candidateScores2 = {
		'__TOTAL': 0,
	};


	// Pre-process the Ballots / Calculate Scores
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

	function sortScore(score) {
		var newScore = [];
		for (var key in score) {
			var s = score[key];
			newScore.push({
				'candidate': key,
				'score': s,
			});
		}
		newScore.sort(function sort(a, b) {
			return b.score-a.score;
		});

		return newScore;
	}
	resultContext.results.candidateScores1 = sortScore(candidateScores1);
	resultContext.results.candidateScores2 = sortScore(candidateScores2);




	// ===================================
	// Experimental RCV algorithm
	// ===================================
		var experiment1 = {
			'rounds': [],
			'eliminatedCandidates': eliminatedCandidates,
		};
		var roundIndex = 1;
		var lastEntriesCounted = 0;
		while (true) {
			var round = {};

			var count = {};
			var entriesCounted = 0;
			// Add up the ballots up to the round
			var switches = {};
			for (var ballotIdx = 0; ballotIdx < ballots.length; ballotIdx++) {
				var currentBallot = ballots[ballotIdx];
				for (var choiceIdx = 0, choiceRank = 0; choiceIdx < currentBallot.ballotChoices.length; choiceIdx++) {
					var option = currentBallot.ballotChoices[choiceIdx];
					if (option === null) {
						continue;
					}
					count[option] = count[option] ? count[option]+1 : 1;
					entriesCounted++;
					// Find switches
					for (var i = choiceIdx-1; i >= 0; i--) {
						var currOption = currentBallot.ballotChoices[i];
						if (currOption === null) {
							continue;
						}
						var key = option+"<"+currOption;
						switches[key] = switches[key] ? switches[key]+1 : 1;
					}

					choiceRank++;
					if (choiceRank === roundIndex) {
						break;
					}
				}
			}
			round.count = count;
			round.switches = switches;
			round.entriesCounted = entriesCounted;

			// Find the top Candidate(s)
			var topCount = 0;
			var top = [];
			for (var countKey in count) {
				var votes = count[countKey];
				if (votes > topCount) {
					top = [];
					topCount = votes;
				}
				if (votes === topCount) top.push(countKey);
			}
			round.top = top;
			round.topCount = topCount;

			experiment1.rounds.push(round);

			// Check for winner
			if (topCount >= simpleMajority) {
				experiment1.winner = top;
				experiment1.result = "Outright Majority";
				break;
			}

			if (lastEntriesCounted === entriesCounted) {
				experiment1.winner = top;
				experiment1.result = "Simple Majority";
				break;
			}
			lastEntriesCounted = entriesCounted;
			roundIndex++;
		}
		resultContext.results.experiment1 = experiment1;



	// ===================================
	// Standard RCV algorithm
	// ===================================
		roundIndex = 1;
		var voteSwitches = {};
		eliminatedCandidates = [];
		var standardRCV = {
			'rounds': {},
			'eliminatedCandidates': eliminatedCandidates,
			'voteSwitches': voteSwitches,
		};
		var lastResult = '';
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
			standardRCV.rounds[roundIndex] = ballotCount;

			// End If there's a simple majority candidate
			if (topCount >= simpleMajority) {
				standardRCV.winner = top[0];
				standardRCV.electionResult = "Winner by Outright Majority";
				break;
			}
			if (roundIndex >= 100) {
				standardRCV.electionResult = "Error!  Bailed early";
				break;
			}
			if (topCount === bottomCount) {
				if (top.length === 1) {
					// End if there is only one candidate left
					standardRCV.winner = top[0];
					standardRCV.electionResult = "Winner by Simple Majority";
					break;
				} 
				else {
					// Check tie
					console.log('>>> Checking result!!!',ballotCount['__top'], ballotCount['__bottom']);
					var check = '';
					for (var i = 0; i < ballotCount['__top'].length; i++) {
						check += ballotCount['__top'][i]+"_";
					}
					if (check === lastResult) {
						// End if there is a tie
						standardRCV.electionResult = "Tie vote";
						standardRCV.winner = null;
						standardRCV.winners = top;
						break;
					}
					lastResult = check;
				}
			}

			// Otherwise, remove the bottom candidates and try again
			for (var bottomIdx = 0; bottomIdx < bottom.length; bottomIdx++) eliminatedCandidates.push(bottom[bottomIdx]);

			roundIndex++;
		}
		standardRCV.voteSwitches = sortScore(voteSwitches);
		resultContext.results.standardRCV = standardRCV;



	return resultContext;
}
processBallots(ballots);