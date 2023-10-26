import { readable } from 'svelte/store';
import { browser } from '$app/environment';

function create_sse_store(init = true) {
	let event_source;

	return readable([], (set, update) => {
		if (!init) return;

		event_source = new EventSource('/sse');

		event_source.addEventListener('message', (event) => {
			update((array) => [...array, JSON.parse(event.data)]);
		});

		return () => event_source.close();
	});
}

const store = create_sse_store(browser);

export default store;
