
class CacheController
{
	dataCacheName = null;
	cacheName = null; 
	
	constructor(prefix)
	{
		this.cacheName = prefix; 
		this.dataCacheName = prefix + '-data'; 
	}

	open(cacheName, callBack)
	{
		return caches.open(cacheName).then(callBack);
	}

	addFiles(files)
	{
		return this.open(this.cacheName, (cache) => 
		{
			return cache.addAll(files);
		}); 
	}

	addData(key, data)
	{
		return this.open(this.dataCacheName, (cache) => 
		{
			return cache.put(key, data);
		}); 
	}

	removeData(key)
	{
		return this.open(this.dataCacheName, (cache) => 
		{
			return caches.delete(key);
		}); 
	}

	fetchData(e)
	{
		const request = e.request, 
		networkPromise = fetch(request);
		
		return caches.open(this.dataCacheName).then(async (cache) => 
		{
			const cachedResponse = await cache.match(request);
			const networkResponse = await networkPromise;
			cache.put(request, networkResponse.clone());
			
			return cachedResponse || networkPromise;
		});
	}

	fetchFile(e)
	{
		const request = e.request;
		return caches.open(this.cacheName).then(async (cache) => 
		{
			const cachedResponse = await cache.match(request);
			return cachedResponse || fetch(request).then((response) => 
			{
				cache.put(request, response.clone());
				return response;
			});
		});
	}

	refresh()
	{
		const cacheName = this.cacheName, 
		dataCacheName = this.dataCacheName; 
		
		return caches.keys().then((keyList) =>
		{
			return Promise.all(keyList.map((key) =>
			{
				if (key !== cacheName && key !== dataCacheName) 
				{
					return caches.delete(key);
				}
			}));
		}); 
	}
}