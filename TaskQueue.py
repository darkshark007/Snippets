import asyncio
from datetime import datetime
import time
import threading

class TaskQueue():
	
	def __init__(self, max_tasks=1000, max_log_index=200, loop_delay=0.1):
		self.max_tasks = max_tasks
		self.current_tasks = 0
		self.queued_tasks = 0
		self.log = []
		self.log_index = 0
		self.max_log_index = max_log_index
		self.loop_delay = loop_delay
		
		# Start the Task Runner
		self.should_run = True
		self.asyncio = asyncio
		self.event_loop = self.asyncio.new_event_loop()
		self.thread = threading.Thread(target=self.start_loop)
		self.thread.start()

		# Init the log
		for idx in range(0, self.max_log_index):
			self.log.append("")
			
	def stop(self):
		self.should_run = False
		self.thread.join()
		
	def log_message(self, message):
		dt = datetime.fromtimestamp(time.time())
		h = "%s" % dt.hour
		while len(h) < 2:
			h = "0"+h
		m = "%s" % dt.minute
		while len(m) < 2:
			m = "0"+m
		s = "%s" % dt.second
		while len(s) < 2:
			s = "0"+s
		self.log[self.log_index] = '[%s:%s:%s] %s' % (h,m,s,message)
		self.log_index = (self.log_index+1) % self.max_log_index
	
	def log_to_string(self):
		log_string = ""
		log_index = self.log_index
		for idx in range(0,self.max_log_index):
			adjusted_idx =  (idx + log_index) % self.max_log_index
			if self.log[adjusted_idx] != "":
				log_string = log_string+self.log[adjusted_idx]+"\n"
		return log_string
		
	def queue_task_in_thread(self, task):
		self.queued_tasks = self.queued_tasks+1
		async def run_task():
			await self.untilQueueHasRoom()
			self.queued_tasks = self.queued_tasks-1
			self.current_tasks = self.current_tasks + 1	
			ntq = TaskQueue(1)
			ntq.queue_task(task)
			await ntq.untilQueueIsEmpty()
			ntq.stop()
			self.current_tasks = self.current_tasks - 1
		self.asyncio.run_coroutine_threadsafe(run_task(), self.event_loop)
	
	async def task_is_started_in_thread(self, task):
		self.queued_tasks = self.queued_tasks+1
		await self.untilQueueHasRoom()
		self.queued_tasks = self.queued_tasks-1
		self.current_tasks = self.current_tasks + 1	
		async def run_task():
			ntq = TaskQueue(1)
			ntq.queue_task(task)
			await ntq.untilQueueIsEmpty()
			ntq.stop()
			self.current_tasks = self.current_tasks - 1
		self.asyncio.run_coroutine_threadsafe(run_task(), self.event_loop)
		
	def queue_task(self, task):
		self.queued_tasks = self.queued_tasks+1
		async def run_task():
			await self.untilQueueHasRoom()
			self.queued_tasks = self.queued_tasks-1
			self.current_tasks = self.current_tasks + 1
			try:
				await task(queue=self)
			except Exception as e:
				self.log(e)
				raise e
			finally:
				self.current_tasks = self.current_tasks - 1
		self.asyncio.run_coroutine_threadsafe(run_task(), self.event_loop)
		
	async def task_is_started(self, task):
		self.queued_tasks = self.queued_tasks+1
		await self.untilQueueHasRoom()
		self.queued_tasks = self.queued_tasks-1
		self.current_tasks = self.current_tasks + 1
		async def run_task():
			try:
				await task(queue=self)
			except Exception as e:
				self.log(e)
				raise e
			finally:
				self.current_tasks = self.current_tasks - 1
		self.asyncio.run_coroutine_threadsafe(run_task(), self.event_loop)
	
	
	async def task_is_run(self, task):
		self.queued_tasks = self.queued_tasks+1
		await self.untilQueueHasRoom()
		self.queued_tasks = self.queued_tasks-1
		self.current_tasks = self.current_tasks + 1
		try:
			result = await task(queue=self)
		except Exception as e:
			self.log(e)
			raise e
		finally:
			self.current_tasks = self.current_tasks - 1
		return result
	
	
	def queueIsEmpty(self):
		return self.current_tasks+self.queued_tasks == 0
		
	async def untilQueueIsEmpty(self):
		while self.queueIsEmpty() is not True:
			await self.asyncio.sleep(self.loop_delay)
	
	def queueHasRoom(self):
		return self.current_tasks < self.max_tasks
		
	async def untilQueueHasRoom(self):
		while self.queueHasRoom() is not True:
			await self.asyncio.sleep(self.loop_delay)
	
	def start_loop(self):
		self.asyncio.set_event_loop(self.event_loop)
		while self.should_run is True:
			self.event_loop.run_until_complete(self.asyncio.sleep(self.loop_delay))
	
