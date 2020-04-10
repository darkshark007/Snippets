
// ??? I don't remember what the context for this code was :S
function buildRngMap(chunkWidth, seedWidth, lengthWidth, offsetWidth) {
	var map = {}

	function getNewChainNode(seed, offset, value) {
		return {
			'seed': seed,
			'offset': offset,
			'value': value,
			'prevNode': null,
			'nextNode': null,
		};
	}

	function getNewMapContext(value) {
		return {
			'value': value,
			'rootNodes': [],
			'nextMap': {},
		};
	}

	for (var seedIdx = 0; seedIdx < seedWidth; seedIdx++) {
		var currentSeed = new RNG(seedIdx);
		var prevNode = null;
		var prevContext = null;
		for (var lengthIdx = 0; lengthIdx < (lengthWidth+offsetWidth); lengthIdx++) {
			var currentValue = currentSeed.nextRange(0, chunkWidth);
			var currentChainNode = getNewChainNode(seedIdx, lengthIdx, currentValue);
			if (!map[currentValue]) map[currentValue] = getNewMapContext(currentValue);
			var currentMapContext = map[currentValue];

			if (prevNode) {
				currentChainNode.prevNode = prevNode;
				prevNode.nextNode = currentChainNode;
				if (!prevContext.nextMap[currentValue]) prevContext.nextMap[currentValue] = [];
				var prevNextMap = prevContext.nextMap[currentValue];
				prevNextMap.push(currentChainNode);
			}

			if (lengthIdx <= offsetWidth) {
				currentMapContext.rootNodes.push(currentChainNode);				
			}

			prevNode = currentChainNode;
			prevContext = currentMapContext;
		}
	}
	
	return map;
}