# =================================================================================================
# Python Logger/Profiler
#     Written by Stephen Bush
# =================================================================================================

# from datetime import datetime
def getLogEvent(message):
    return {
        'timestamp': datetime.datetime.now(),
        'delay': 0,
        'message': message,
    }


def getLogStatContext():
    return {
        'min': 0,
        'max': 0,
        'total': 0,
        'average': 0,
        'count': 0,
        'events': [],
    }


_log = {}
_loggerlist = []
_stats = {}
print('>>> INIT LOGGER')


def logger(target, message):
    print('>>LOGGER>> Logging message')
    global _log
    global _loggerlist
    global _stats
    # Configure new Loggers
    try:
        targKey = _loggerlist.index(target)
    except:
        _loggerlist.append(target)
        targKey = _loggerlist.index(target)
        _log[targKey] = {
            'log': [getLogEvent("Start Log")],
            '_stats': {}
        }

    log = _log[targKey]

    # Log the event
    lastEvent = log['log'][len(log['log']) - 1]
    event = getLogEvent(message)
    event['delay'] = (event['timestamp'] - lastEvent['timestamp']).microseconds
    log['log'].append(event)

    # Update the Stats
    statKey = lastEvent['message'] + "__" + event['message']
    for statLog in [_stats, log['_stats']]:
        print('>>LOGGER>> Update Stats for %s' % statKey)
        if statKey not in statLog:
            print('>>LOGGER>>! New statKey')
            statLog[statKey] = getLogStatContext()
        stats = statLog[statKey]
        stats['events'].append(event['delay'])
        if stats['min'] > event['delay']:
            stats['min'] = event['delay']
        if stats['max'] < event['delay']:
            stats['max'] = event['delay']
        print('>>LOGGER>> Key: %s   Count: %s' % (statKey, stats['count']))
        stats['count'] = stats['count'] + 1
        stats['total'] = stats['total'] + event['delay']
        stats['average'] = (stats['total'] / stats['count'])

# =================================================================================================