function getNewColumnConfig(config) {
	if (!config) config = {};
	var column = {
		'name': config.name || "",
		'align': config.align || "center",
		'width': config.width || null,
	};
	return column;
}

function printTable(config) {
	if (!config) throw new Error("No config passed in!");
	if (!config.data) throw new Error("No data passed in!");
	var columnConfig = config.columns || [];
	var data = config.data;
	var tableStr = "";

	// Process Columns
	var dataWidth = Math.max(data[0].length, columnConfig.length);
	for (var idxColumn = 0; idxColumn < dataWidth; idxColumn++) {
		if (!columnConfig[idxColumn]) columnConfig[idxColumn] = getNewColumnConfig();
		if (columnConfig[idxColumn].width === null) {
			// Iterate over the data and find the max width
			var maxWidth = columnConfig[idxColumn].name.length;
			for (var idxData = 0; idxData < data.length; idxData++) {
				var printStr = data[idxData][idxColumn];
				if (printStr === undefined || printStr === null) printStr = ""; // If Null, skip that value
				printStr = printStr+""; // Cast to String;
				if (printStr.length > maxWidth) maxWidth = printStr.length;
			}
			columnConfig[idxColumn].width = maxWidth;
		}
	}

	// Print Header
	var rowStr = "";
	var dividerStr = "";
	for (var idxColumn = 0; idxColumn < dataWidth; idxColumn++) {
		rowStr += padCenter(columnConfig[idxColumn].name.substring(0,columnConfig[idxColumn].width), columnConfig[idxColumn].width);
		dividerStr += "-".repeat(columnConfig[idxColumn].width);
		if (idxColumn+1 < dataWidth) {
			rowStr += " | ";
			dividerStr += "-|-";
		}
	}
	tableStr += rowStr+"\n";
	tableStr += dividerStr+"\n";

	// Print Data
	for (var idxData = 0; idxData < data.length; idxData++) {
		var rowStr = "";
		for (var idxColumn = 0; idxColumn < dataWidth; idxColumn++) {
			var printStr = data[idxData][idxColumn];
			if (printStr === undefined || printStr === null) printStr = ""; // If Null, skip that value
			printStr = printStr+""; // Cast to String;
			printStr = printStr.substring(0, columnConfig[idxColumn].width); // Trimmed
			if (columnConfig[idxColumn].align === "center")
				printStr = padCenter(printStr, columnConfig[idxColumn].width);
			if (columnConfig[idxColumn].align === "left")
				printStr = padRight(printStr, columnConfig[idxColumn].width);
			if (columnConfig[idxColumn].align === "right")
				printStr = padLeft(printStr, columnConfig[idxColumn].width);
			rowStr += printStr;
			if (idxColumn+1 < dataWidth) rowStr += " | ";
		}
		tableStr += rowStr+"\n";
	}
	return tableStr;
}

function padLeft(st, length) {
	while (st.length < length) st = " "+st;
	return st;
}
function padRight(st, length) {
	while (st.length < length) st = st+" ";
	return st;
}
function padCenter(st, length) {
	var left = true;
	while (st.length < length) {
		st = left ? " "+st : st+" ";
		left = !left;
	}
	return st;
}