// =================================================================================================
// Javascript Logger/Profiler
//   Written by Stephen Bush
// =================================================================================================
if (!window.logger) {
    function getLogEvent(message) {
      return {
        timestamp: new Date(),
        delay: 0,
        message,
      };
    }
    function getLogStatContext() {
      return {
        min: 0,
        max: 0,
        total: 0,
        average: 0,
        count: 0,
        events: [],
      };
    }
    window.logger = function(target, message) {
      // Configure new Loggers
      var targKey = window.logger._loggerList.indexOf(target);
      if (targKey === -1) {
        window.logger._loggerList.push(target);
        targKey = window.logger._loggerList.indexOf(target);
        window.logger._log[targKey] = [getLogEvent("Start Log")];
        window.logger._log[targKey]._stats = {};
      }
      var log = window.logger._log[targKey];

      // Log the event
      var lastEvent = log[log.length-1];
      var event = getLogEvent(message);
      event.delay = (event.timestamp - lastEvent.timestamp);
      log.push(event);

      // Update the Stats
      var statKey = lastEvent.message+"__"+event.message;
      [window.logger._stats, log._stats].forEach((statLog) => {
        if (statLog[statKey] === undefined) {
          statLog[statKey] = getLogStatContext();
        }
        var stats = statLog[statKey];
        stats.events.push(event.delay);
        if (stats.min > event.delay) stats.min = event.delay;
        if (stats.max < event.delay) stats.max = event.delay;
        stats.count = stats.count+1;
        stats.total = stats.total + event.delay;
        stats.average = (stats.total / stats.count);
      });
    }
    window.logger._log = {};
    window.logger._loggerList = [];
    window.logger._stats = {};
}
// =================================================================================================