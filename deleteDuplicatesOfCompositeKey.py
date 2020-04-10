c = 0
f = 0
t = Job.objects.count()
job_map = {}
for job in Job.objects.all():
    print("%s/%s == %s" % (c, t, math.floor(c*10000/t)/100))
    c += 1
    key = "%s-%s" % (job.is_legacy, job.job_id)
    if job_map.get(key, None) is None:
        job_map[key] = job
    else:
        f += 1
        job.delete()
