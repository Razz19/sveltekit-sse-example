<script>
	import sse from '$lib/stores/sse';
</script>

<h1>SSE Example</h1>

<ol>
	{#each $sse as message (message)}
		<li>{message.text}</li>
	{/each}
</ol>
