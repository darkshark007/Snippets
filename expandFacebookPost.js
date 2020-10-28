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

async function checkForMoreComments() {
	var count = 0;

	var classList = [
		'rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz n8tt0mok hyh9befq r8blr3vg jwdofwj8 g0qnabr5',
		'd2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa fgxwclzu a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v lrazzd5p m9osqain',
	]
	for (var classKey in classList) {
		var currClass = classList[classKey];
	
		var list = document.getElementsByClassName(currClass);
		for (var key in list) {
			var element = list[key];

			if (element.textContent === "View more comments" || element.textContent === "View previous comments") {
				count += 1;
				await clickToExpand(element);
			}
			var splitText = element.textContent ? element.textContent.split(' ') : [];
			if (splitText.length >= 3 && (splitText[0] === 'View' && splitText[2] === 'more' && (splitText[3] === 'comments' || splitText[3] === 'comment'))) {
				count += 1;
				await clickToExpand(element);
			}

			// Look for Replies
			splitText = element.textContent ? element.textContent.split(' ') : [];
			if (splitText.length >= 2 && (splitText[1] === 'Replies' || splitText[1] === 'Reply' || (splitText[2] === 'more' && (splitText[3] === 'reply' || splitText[3] === 'replies')) )) {
				count += 1;
				await clickToExpand(element);
			}
		}
	}
	return count;
}


async function checkForExpandedComments() {
	var count = 0;

	var list = document.getElementsByClassName('oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p')
	for (var key in list) {
		var element = list[key];
		if (!element.textContent) continue;

		// Look for More Text
		if (element.textContent === "See More") {
			count += 1;
			await clickToExpand(element);			
		}

	}
	return count;
}

// var classList = [
// 	// View Previous Comments
// 	' _4ssp',
// 	// X Replies
// 	'_4sso',
// 	'rq0escxv l9j0dhe7 du4w35lb q9uorilb cbu4d94t g5gj957u d2edcug0 hpfvmrgz rj1gh0hx buofh1pr n8tt0mok hyh9befq r8blr3vg jwdofwj8 g0qnabr5 ni8dbmo4 stjgntxs ltmttdrg',
// 	// See More
// 	'_5v47',
// 	'oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p',
// ]
// async function checkForExpandsByClass() {
// 	var count = 0;

// 	for (var classKey in classList) {
// 		var currClass = classList[classKey];
// 		var list = document.getElementsByClassName(currClass);
// 		for (var idxList = 0; idxList < list.length; idxList++) {
// 			var element = list[idxList];
// 			count += 1;
// 			await clickToExpand(element);			
// 		}
// 	}
// 	return count;
// }

async function expandPost() {
	console.log(">>> Expanding Post");
	var totalCount = 0;
	totalCount += await checkForMoreComments();
	totalCount += await checkForExpandedComments();
	// totalCount += await checkForExpandsByClass();

	console.log(">>> Expanded "+totalCount+" elements");
	if (totalCount > 0) {
		await new Promise((res,rej) => setTimeout(res, 2000))
		expandPost();
	}
}

expandPost();