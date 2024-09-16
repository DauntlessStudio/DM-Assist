<script>
	import { Pane, Splitpanes } from 'svelte-splitpanes';
    import DiceBox from '$lib/components/DiceBox.svelte';
</script>

<Splitpanes style="height:100vh">
	<Pane minSize={20} size={20}>
		<DiceBox/>
	</Pane>
	<Pane>
        2
	</Pane>
	<Pane minSize={25} size={25}>
        3
    </Pane>
</Splitpanes>
