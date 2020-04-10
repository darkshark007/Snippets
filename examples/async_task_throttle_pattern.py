import time
import random
import asyncio

PENDING_REQUESTS = 0
MAX_PENDING_REQUESTS = 10


async def runTask(id):
	global PENDING_REQUESTS
	
	await blockIfMaxTasks()
	print('Running Task #%s (%s/10)!' % (id, PENDING_REQUESTS))
	PENDING_REQUESTS = PENDING_REQUESTS+1
	r = 1
	while r > 0.1:
		r = random.random()
		await asyncio.sleep(1)
	
	PENDING_REQUESTS = PENDING_REQUESTS-1
	print('Completed Task %s!' % id)
	return True


async def blockIfMaxTasks():
	while PENDING_REQUESTS >= MAX_PENDING_REQUESTS:
		await asyncio.sleep(1)


async def main():
	l = []
	for idx in range(0,15):
		l.append(runTask(idx))
	
	await asyncio.gather(*l)
	print('All Tasks Complete!')

