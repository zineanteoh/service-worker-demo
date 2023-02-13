self.addEventListener("install", (event) => {
	console.log("V1 installing…");
	// cache an image
	event.waitUntil(
		caches.open("static-v1").then((cache) => cache.add("./imgs/B.png"))
	);
});

self.addEventListener("activate", (event) => {
	console.log("V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
	const url = new URL(event.request.url);
	console.log("Fetching request!");
	console.log("Request origin: " + url.origin);
	console.log("Location origin: " + location.origin);
	console.log("Request Path: " + url.pathname);

	// serve the second image from the cache if the request is
	// same-origin and the path includes '/imgs/A.png'
	if (url.origin == location.origin && url.pathname.includes("imgs/A.png")) {
		console.log("Hit! Serving from cache: " + url.pathname);
		event.respondWith(caches.match("./imgs/B.png"));
	}
});
