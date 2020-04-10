function enderEyeSimulator(config) {
	config = config || {};
	var numSims = config.numSims || 100;
	function generateResult() {
		var sim_result = {
			'total': 0 
		};
		for (var idxEye = 0; idxEye < 12; idxEye++) {
			if (Math.random() >= 0.1) {
				sim_result[idxEye] = 0;
			}
			else {
				sim_result[idxEye] = 1;
				sim_result.total++;
			}
		}
		return sim_result;
	}

	var result_context = {
		'simResults': [],
		'resultBreakdown': {
			0: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
			7: 0,
			8: 0,
			9: 0,
			10: 0,
			11: 0,
			12: 0,
			'total': 0,
		},
	};

	for (var i = 0; i < numSims; i++) {
		var result = generateResult();
		result_context.simResults.push(result);
		result_context.resultBreakdown[result.total]++;
		result_context.resultBreakdown.total++;
	}


	return result_context;
}


function generatePossibilityTable() {
	var data = [];
	function fact(idx) { return idx === 0 ? 1 : idx * fact(idx-1); }
	for (var idxEye = 0; idxEye <= 12; idxEye++) {
		var combinations = (fact(12)/(fact(idxEye)*fact(12-idxEye)));
		var chanceToOccurr = combinations*Math.pow(0.1,idxEye)*Math.pow(0.9,(12-idxEye));
		// var perc = (Math.round(chanceToOccurr*10000000.0)/100000.0)+"%";
		var perc = (chanceToOccurr*100).toFixed(4)+"%";
		var chanceIn = 1.0/chanceToOccurr;
		// var chanceInTrimmed = (Math.round(chanceIn*100.0)/100.0)
		var chanceInTrimmed = "1/"+chanceIn.toFixed(2);
		var row = [idxEye, combinations, chanceToOccurr.toFixed(12), perc, chanceInTrimmed];
		data.push(row);
		console.log(row);
	}
	return printTable({
		columns: [
			getNewColumnConfig({name: "Eyes", align: 'right'}),
			getNewColumnConfig({name: "# Configs", align: 'right'}),
			getNewColumnConfig({name: "Occurrence chance", align: 'right'}),
			getNewColumnConfig({name: "Percent", align: 'right'}),
			getNewColumnConfig({name: "Rate", align: 'left'}),
		],
		data: data,
	});
}


// Eyes | # Configs | Occurrence chance |  Percent |        Rate       
// -----|-----------|-------------------|----------|-------------------
//    0 |         1 |    0.282429536481 | 28.2430% | 1/3.54            
//    1 |        12 |    0.376572715308 | 37.6573% | 1/2.66            
//    2 |        66 |    0.230127770466 | 23.0128% | 1/4.35            
//    3 |       220 |    0.085232507580 |  8.5233% | 1/11.73           
//    4 |       495 |    0.021308126895 |  2.1308% | 1/46.93           
//    5 |       792 |    0.003788111448 |  0.3788% | 1/263.98          
//    6 |       924 |    0.000491051484 |  0.0491% | 1/2036.45         
//    7 |       792 |    0.000046766808 |  0.0047% | 1/21382.69        
//    8 |       495 |    0.000003247695 |  0.0003% | 1/307910.69       
//    9 |       220 |    0.000000160380 |  0.0000% | 1/6235191.42      
//   10 |        66 |    0.000000005346 |  0.0000% | 1/187055742.61    
//   11 |        12 |    0.000000000108 |  0.0000% | 1/9259259259.26   
//   12 |         1 |    0.000000000001 |  0.0000% | 1/1000000000000.00

