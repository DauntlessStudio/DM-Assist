<script lang="ts">
  	import type { PageData } from './$types';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Submenu from '$lib/components/Submenu.svelte';
    import DiceBox from '$lib/components/DiceBox.svelte';
	import CombatPanel from '$lib/components/CombatPanel.svelte';
	import MonsterList from '$lib/components/MonsterList.svelte';
	import { EventManager } from '$lib/utils/events';

	export let data: PageData;
	let showSubmenu: boolean = false;

	EventManager.events.openSubmenu.subscribe((str) => {
		showSubmenu = true;
	});
</script>

<div>
	<div>
		<Splitpanes style="height:98vh">
			<Pane minSize={20} size={20}>
				<DiceBox/>
			</Pane>
			<Pane>
				Combat Text Here
			</Pane>
			<Pane minSize={25} size={25}>
				<CombatPanel/>
			</Pane>
		</Splitpanes>
	</div>
	{#if showSubmenu}
	<Submenu bind:visible={showSubmenu} height={400} width={600}>
		<MonsterList monsters={data.monsters}/>
	</Submenu>
	{/if}
</div>