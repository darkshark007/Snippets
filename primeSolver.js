function getNewProbabilityTable() {
	return { 0: 10, 1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 10, 8: 10, 9: 10 };
}

var __digitId = 0;
function getNewDigit() {
	function Digit() {
		this.value = 0;
		this.probabilityTable = getNewProbabilityTable();
		this.relatedConstraints = [];
		this.digitId = __digitId++;
		this.compositeTable = this.probabilityTable;
		this.probabilitySum = Math.log(10)*10;
	}

	Digit.prototype = {
		'reroll': function() {
			var table = getNewProbabilityTable();

			// Get Base probability
			for (var idx = 0; idx < 10; idx++) {
				table[idx] += this.probabilityTable[idx];
			}

			// Get constraint probabilities
			for (var constraintKey in this.relatedConstraints) {
				var currentConstraint = this.relatedConstraints[constraintKey];
				for (var digitKey in currentConstraint.digits) {
					var currentDigit = currentConstraint.digits[digitKey];
					if (this.digitId === currentDigit.digitId) continue;
					for (var idx = 0; idx < 10; idx++) {
						var relationKey = ""
						if (this.digitId > currentDigit.digitId) {
							var relationKey = `${this.digitId}>${idx},${currentDigit.digitId}>${currentDigit.value}`;
						} else {
							var relationKey = `${currentDigit.digitId}>${currentDigit.value},${this.digitId}>${idx}`;
						}
						if (!currentConstraint.digitRelationProbabilities[relationKey]) continue;
						table[idx] += currentConstraint.digitRelationProbabilities[relationKey];
					}

				}
			}
			this.compositeTable = table;

			// Get sum
			var probabilitySum = 0;
			for (var idx = 0; idx < 10; idx++) {
				probabilitySum += Math.log(table[idx]);
			}
			this.probabilitySum = probabilitySum;

			// Get random value from table
			var rand = Math.random()*probabilitySum;
			for (var idx = 0; idx < 10; idx++) {
				var idxVal = Math.log(table[idx]); 
				if (idxVal >= rand) {
					this.value = idx;
					return;
				}
				rand -= idxVal;
			}
		},
	}

	return new Digit();
}

function getNewConstraint(digits, evalFunc) {
	function Constraint(digits, evalFunc) {
		this.evalFunc = evalFunc;
		this.digits = digits;
		this.success = false;
		this.evalCalculation = 0;
		this.digitRelationProbabilities = {};
		for (var digitKey in digits) {
			var currentDigit = digits[digitKey];
			currentDigit.relatedConstraints.push(this);
		}
	}

	Constraint.prototype = {
		'evaluate': function() {
			this.success = this.evalFunc(this);
			if (this.success) {
				for (var digitKey in digits) {
					var currentDigit = digits[digitKey];
					currentDigit.probabilityTable[currentDigit.value]++;

					for (var digitKey2 in digits) {
						if (digitKey === digitKey2) continue;
						var currentDigit2 = digits[digitKey2];
						if (currentDigit.digitId < currentDigit2.digitId) continue;
						var relationKey = `${currentDigit.digitId}>${currentDigit.value},${currentDigit2.digitId}>${currentDigit2.value}`;
						if (!this.digitRelationProbabilities[relationKey]) this.digitRelationProbabilities[relationKey] = 0;
						this.digitRelationProbabilities[relationKey]++;
					}
				}

				for (var digitKey in this.digits) {
				}
			}
		}

	};

	return new Constraint(digits, evalFunc);
}

function getNewRowConstraint(digits, modulus) {
	var evalFunc = function(constraint) {
		var pairs = digits.length / 2;
		var sum = 0;
		for (var pairIdx = 0; pairIdx < pairs; pairIdx++) {
			var n1 = digits[(pairIdx*2)+0].value;
			var n2 = digits[(pairIdx*2)+1].value;
			sum += (n1*n2);
		}
		constraint.evalCalculation = sum;
		if (sum % 10 === modulus) return true;
		return false;
	}

	var constraint = getNewConstraint(digits, evalFunc);
	constraint.modulus = modulus;
	return constraint;
}

// TODO: Should take string `targetValue` instead of int
function getSummaryConstraint(rowConstraints, targetValue) {
	var evalFunc = function(constraint) {
		var scale = 1;
		var sum = 0;
		for (var constIdx = rowConstraints.length-1; constIdx >= 0; constIdx--) {
			var currentConstraint = rowConstraints[constIdx];
			sum += currentConstraint.evalCalculation * scale;
			scale *= 10;
		}
		constraint.evalCalculation = sum;
		if (sum === targetValue) return true;
		return false;
	}
	var constraint = getNewConstraint(null, evalFunc);
	constraint.rowConstraints = rowConstraints;
	constraint.targetValue = targetValue;
	return constraint;
}

function calculateDigitsAndConstraints(digits, constraints) {
	var maxIterations = Math.pow(10,digits.length);
	var currentIteration = 0;
	var summaryConstraint = constraints[constraints.length-1]; // Should be last one
	while (currentIteration < maxIterations) {
		for (var digitKey in digits) digits[digitKey].reroll();
		for (var constraintKey in constraints) constraints[constraintKey].evaluate();

		if (summaryConstraint.success) {
			var strn = ""; 

			// Add num Iterations
			strn += "Iterations: "+currentIteration+"   ";

			// Add Digits
			strn += "digits: {";
			for (digitKey in digits) {
				var currentDigit = digits[digitKey];
				strn += currentDigit.value+",";
			}
			strn += "}";

			console.log("FOUND A SOLUTION!", strn, digits, constraints);
		}
		currentIteration++;
	}
}

function calculateNumberWithDigitWidths(targetValue, widthA, widthB) {
	var digitsA = [];
	for (var widthIdx = 0; widthIdx < widthA; widthIdx++) digitsA.push(getNewDigit());
	var digitsB = [];
	for (var widthIdx = 0; widthIdx < widthB; widthIdx++) digitsB.push(getNewDigit());
	var digits = digitsA.concat(digitsB);

	var rowConstraints = [];
	var numRows = widthA+widthB-1;
	var rowDigits = {};
	for (var rowIdx = 0; rowIdx < numRows; rowIdx++) rowDigits[rowIdx] = [];
	for (var idxA = 0; idxA < widthA; idxA++) {
		for (var idxB = 0; idxB < widthB; idxB++) {
			var rowIdx = idxA+idxB;
			rowDigits[rowIdx].push(digitsA[idxA]);
			rowDigits[rowIdx].push(digitsB[idxB]);
		}
	}
	for (var rowIdx = 0; rowIdx < numRows; rowIdx++) rowConstraints.push(getNewRowConstraint(rowDigits[rowIdx], targetValue.charAt(rowIdx)*1));

	var summaryConstraint = getSummaryConstraint(rowConstraints, targetValue*1);

	var allConstraints = [].concat(rowConstraints);
	allConstraints.push(summaryConstraint);
	return calculateDigitsAndConstraints(digits, allConstraints);
}

// // 420, 2x2
// var digitsA = [
// 	getNewDigit(),
// 	getNewDigit(),
// ];

// var digitsB = [
// 	getNewDigit(),
// 	getNewDigit(),
// ];

// var digits = digitsA.concat(digitsB);
// var rowConst4 = getNewRowConstraint([digitsA[0], digitsB[0]], 4);
// var rowConst2 = getNewRowConstraint([digitsA[0], digitsB[1], digitsA[1], digitsB[0]], 2);
// var rowConst0 = getNewRowConstraint([digitsA[1], digitsB[1]], 0);
// var summaryConst = getSummaryConstraint([rowConst4, rowConst2, rowConst0], 420);

// var constraints = [
// 	rowConst4,
// 	rowConst2,
// 	rowConst0,
// 	summaryConst,
// ];
// calculateDigitsAndConstraints(digits, constraints);

// var c = calculateNumberWithDigitWidths("297316", 3, 3);
var c = calculateNumberWithDigitWidths("420", 2, 2);