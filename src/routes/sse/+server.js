const connections = new Set();

function create_message_string(message) {
	return (
		Object.entries(message)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n') + '\n\n'
	);
}

setInterval(() => {
	const message_string = create_message_string({
		data: JSON.stringify({ text: `Hello: ${crypto.randomUUID()}` })
	});

	connections.forEach((controller) => controller.enqueue(message_string));
}, 1000);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	let _controller;

	const body = new ReadableStream({
		start(controller) {
			_controller = controller;
			connections.add(_controller);
		},
		cancel() {
			connections.delete(_controller);
		}
	});

	const headers = {
		'cache-control': 'no-store',
		'content-type': 'text/event-stream'
	};

	return new Response(body, { headers });
}
