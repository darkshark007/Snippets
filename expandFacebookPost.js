async function clickToExpand(element) {
	return new Promise(async function(resolve, reject) {
		var clickFunction;
		clickFunction = function() {
			console.log("Expanding...", element);
			element.removeEventListener('click', clickFunction);
			resolve();
		}
		element.addEventListener('click', clickFunction, true);
		element.click();
	});
}


async function checkForReplies() {
	var count = 0;

	var spanList = window.document.getElementsByTagName('span');
	for (var key in spanList) {
		var element = spanList[key];
		if (!element.textContent) continue;

		// Look for Replies
		var splitText = element.textContent.split(' ');
		if (splitText.length >= 2 && (splitText[1] === 'Replies' || splitText[1] === 'Reply')) {
			count += 1;
			await clickToExpand(element);
		}

		// Look for Previous Comments
		if (element.textContent === "View previous comments") {
			count += 1;
			await clickToExpand(element);			
		}

	}
	return count;
}

async function checkForExpandedComments() {
	var count = 0;

	var spanList = window.document.getElementsByTagName('a');
	for (var key in spanList) {
		var element = spanList[key];
		if (!element.textContent) continue;

		// Look for More Text
		if (element.textContent === "See More") {
			count += 1;
			await clickToExpand(element);			
		}

	}
	return count;
}

var classList = [
	' _4ssp', // View Previous Comments
	'_4sso', // X Replies
	'_5v47', // See More
]
async function checkForExpandsByClass() {
	var count = 0;

	for (var classKey in classList) {
		var currClass = classList[classKey];
		var list = document.getElementsByClassName(currClass);
		for (var idxList = 0; idxList < list.length; idxList++) {
			var element = list[idxList];
			count += 1;
			await clickToExpand(element);			
		}
	}
	return count;
}

async function expandPost() {
	console.log(">>> Expanding Post");
	var totalCount = 0;
	// totalCount += await checkForReplies();
	// totalCount += await checkForExpandedComments();
	totalCount += await checkForExpandsByClass();

	console.log(">>> Expanded "+totalCount+" elements");
	if (totalCount > 0) {
		await new Promise((res,rej) => setTimeout(res, 10000))
		expandPost();
	}
}

expandPost();