function create_message_string(message) {
	return (
		Object.entries(message)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n') + '\n\n'
	);
}
function create_sse_manager() {
	const connections = new Set();

	return {
		connect() {
			let _controller;

			return new ReadableStream({
				start(controller) {
					_controller = controller;
					connections.add(_controller);
				},
				cancel() {
					connections.delete(_controller);
				}
			});
		},
		send(message_obj) {
			const message_string = create_message_string(message_obj);
			connections.forEach((controller) => controller.enqueue(message_string));
		}
	};
}

const sse_manager = create_sse_manager();

export default sse_manager;
