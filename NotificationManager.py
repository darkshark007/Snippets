import pgi
pgi.require_version('Notify', '0.7')
from pgi.repository import Notify
Notify.init('Test')


__notification_map = {}
def create_or_update_notification(key, title, message, icon="", timeout=3000, urgency=0):
	if __notification_map.get(key, None) is None:
		__notification_map[key] = Notify.Notification.new(title, message, icon)
	notif = __notification_map[key]
	notif.update(title, message, icon)
	notif.set_timeout(timeout)
	notif.set_urgency(urgency)
	notif.show()