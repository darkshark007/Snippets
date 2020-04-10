// var list = document.getElementsByClassName('style-scope ytd-thumbnail-overlay-time-status-renderer')
var list = document.getElementsByTagName('ytd-playlist-video-renderer')
var totalTime = 0;
var totalVideos = 0;
var minTime = 100000000
var maxTime = 0;
for (var idxList = 0; idxList < list.length; idxList++) {
	var current = list[idxList];
	if (current.innerText === "[Private video]" || current.innerText === "[Deleted video]") continue;
	var printString = current.innerText.trim()+"//";
	var split = current.innerText.split('\n')[0].split(':');
	var currentTime = 0;
	if (split.length === 3) {
		currentTime = (((parseInt(split[0])*60)+parseInt(split[1]))*60)+parseInt(split[2]);
	} else if (split.length === 2) {
		currentTime = (parseInt(split[0])*60)+parseInt(split[1]);
	} else if (split.length === 1) {
		currentTime = parseInt(split[0]);
	} else {
		throw new Erorr('Invalid split');
	}
	if (currentTime > maxTime) maxTime = currentTime;
	if (currentTime < minTime) minTime = currentTime;
	printString += split.length+"//"+currentTime;
	totalVideos += 1;
	totalTime += currentTime;
	//console.log(printString);
}

function getTimeStringFromSeconds(secs) {
	var seconds = Math.floor(secs % (60)/(1));
	var minutes = Math.floor(secs % (60*60)/(60));
	var hrs = Math.floor((secs % (60*60*24))/(60*60));
	var days = Math.floor((secs % (60*60*24*7))/(60*60*24));
	var started = false;
	var timeSting = "";
	if (started || days !== 0) {
		started = true;
		timeSting += `${(days+"").padStart(2,"0")}:`;
	} 
	if (started || hrs !== 0) {
		started = true;
		timeSting += `${(hrs+"").padStart(2,"0")}:`;
	} 
	timeSting += `${(minutes+"").padStart(2,"0")}:${(seconds+"").padStart(2,"0")}`;
	return timeSting;
}
console.log(`Total Time: ${getTimeStringFromSeconds(totalTime)}\nMin Time: ${getTimeStringFromSeconds(minTime)}\nMax Time: ${getTimeStringFromSeconds(maxTime)}\n\nTotal Videos: ${totalVideos}\nAverage Video Time: ${getTimeStringFromSeconds(totalTime/totalVideos)}`);
