import sse from '$lib/server/sse';

setInterval(() => {
	sse.send({
		data: JSON.stringify({ text: `Hello: ${crypto.randomUUID()}` })
	});
}, 1000);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const body = sse.connect();

	const headers = {
		'cache-control': 'no-store',
		'content-type': 'text/event-stream'
	};

	return new Response(body, { headers });
}
