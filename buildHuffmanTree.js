function getNode(str, count,) {
	return {
		'nodeString': str,
		'count': count,
		'refString': "",
		'0': null,
		'1': null,
		'parent': null,
		'bitsCount': 0,
	};
}

function buildHuffmanTree(initialNodeList) {

	var resultContext = {};
	resultContext.initialNodeList = initialNodeList;

	var nodeList = [];
	resultContext.nodeList = nodeList;
	for (var nIdx = 0; nIdx < initialNodeList.length; nIdx++)
		nodeList.push(initialNodeList[nIdx]);

	while (nodeList.length > 1) {
		nodeList.sort(function(a, b) {
			return a.count-b.count;
		});

		var first = nodeList.splice(0,1)[0];	
		var second = nodeList.splice(0,1)[0];
		var newNode = getNode(null, first.count+second.count);
		newNode['0'] = first;
		newNode['1'] = second;
		first.parent = newNode;
		second.parent = newNode;
		nodeList.push(newNode);
	}

	// Trace all nodes back
	for (var nIdx = 0; nIdx < initialNodeList.length; nIdx++) {
		var currentNode = initialNodeList[nIdx];
		var refString = "";
		var traceNode = currentNode;
		while (traceNode.parent) {
			var parent = traceNode.parent;
			if (parent['0'] === traceNode) refString = "0"+refString;
			if (parent['1'] === traceNode) refString = "1"+refString;
			traceNode = parent;
		}
		currentNode.refString = refString;
		currentNode.bitsCount = (refString.length*currentNode.count);
	}


	return resultContext;
}

function encodeStringsWithHuffmanTree(stringList, huffmanTree) {
	var retString = "";
	for (var strIdx = 0; strIdx < stringList.length; strIdx++) {
		var currentString = stringList[strIdx];
		for (var nodeIdx = 0; nodeIdx < huffmanTree.initialNodeList.length; nodeIdx++) {
			var currentNode = huffmanTree.initialNodeList[nodeIdx];
			if (currentNode.nodeString === currentString) {
				retString += currentNode.refString;
				break;
			}
		}
	}
	return retString;
}

function dumpTreeDef(initialNodeList) {
	var bitSum = 0;
	var countSum = 0;
	var treeString = "";
    treeString += 'buildHuffmanTree([\n';
	for (var nIdx = 0; nIdx < initialNodeList.length; nIdx++) {
		var node = initialNodeList[nIdx];
		bitSum  += node.bitsCount;
		countSum += node.count;
		treeString += '\tgetNode(\''+node.nodeString+'\', '+node.count+'), // '+node.refString+' ('+node.bitsCount+')\n';
	}
	treeString += ']); // Count: ('+countSum+')    Bits: ('+bitSum+')\n';
	return treeString;
}