import random
import asyncio

class TaskQueue():
	
	def __init__(self, max_tasks=1000):
		self.max_tasks = max_tasks
		self.current_tasks = 0
		self.queued_tasks = 0
		
	def queue_task(self, task):
		self.queued_tasks = self.queued_tasks+1
		async def run_task():
			await self.untilQueueHasRoom()
			self.queued_tasks = self.queued_tasks-1
			self.current_tasks = self.current_tasks + 1			
			await task()
			self.current_tasks = self.current_tasks - 1
		asyncio.create_task(run_task())
		
	async def task_is_started(self, task):
		self.queued_tasks = self.queued_tasks+1
		await self.untilQueueHasRoom()
		self.queued_tasks = self.queued_tasks-1
		self.current_tasks = self.current_tasks + 1
		async def run_task():
			await task()
			self.current_tasks = self.current_tasks - 1
		asyncio.create_task(run_task())
	
	
	async def task_is_run(self, task):
		self.queued_tasks = self.queued_tasks+1
		await self.untilQueueHasRoom()
		self.queued_tasks = self.queued_tasks-1
		self.current_tasks = self.current_tasks + 1
		result = await task()
		self.current_tasks = self.current_tasks - 1
		return result
	
	
	def queueIsEmpty(self):
		return self.current_tasks+self.queued_tasks == 0
		
	async def untilQueueIsEmpty(self):
		while self.queueIsEmpty() is not True:
			await asyncio.sleep(1)
	
	def queueHasRoom(self):
		return self.current_tasks < self.max_tasks
		
	async def untilQueueHasRoom(self):
		while self.queueHasRoom() is not True:
			await asyncio.sleep(1)





def runTask(id, q):
	async def task():
		print('Running Task #%s (%s/10)!' % (id, q.current_tasks))
		r = 1
		while r > 0.1:
			r = random.random()
			await asyncio.sleep(1)
		
		print('Completed Task %s!' % id)
		return True
	return task

async def main():
	q = TaskQueue(max_tasks=10)
	for idx in range(0,15):
		print('Queueing task #%s' % idx)
		result = await q.task_is_run(runTask(idx, q)); print('Result: %s' % result) # Await task to run
		# await q.task_is_started(runTask(idx, q)) # Await Queue'd task to be started
		# q.queue_task(runTask(idx, q)) # Queue up the task, don't wait
	
	print('All Tasks Queued!')
	await q.untilQueueIsEmpty()
	print('All Tasks Complete!')

asyncio.run(main())