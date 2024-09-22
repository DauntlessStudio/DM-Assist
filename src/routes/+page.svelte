<script lang="ts">
  	import type { PageData } from './$types';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Submenu from '$lib/components/Submenu.svelte';
    import DiceBox from '$lib/components/DiceBox.svelte';
	import CombatPanel from '$lib/components/CombatPanel.svelte';
	import MonsterList from '$lib/components/MonsterList.svelte';
	import { EventManager, type Submenus } from '$lib/utils/events';
	import AddPlayer from '$lib/components/AddPlayer.svelte';

	export let data: PageData;
	let showSubmenu: boolean = false;
	let subMenuType: Submenus;

	EventManager.events.openSubmenu.subscribe((str) => {
		showSubmenu = true;
		subMenuType = str;
	});

	EventManager.events.closeSubmenu.subscribe(() => {
		showSubmenu = false;
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
		{#if subMenuType === "monsterList"}
		<Submenu bind:visible={showSubmenu} height={400} width={600}>
			<MonsterList monsters={data.monsters}/>
		</Submenu>
		{:else if subMenuType === "addPlayer"}
		<Submenu bind:visible={showSubmenu} height={100} width={600}>
			<AddPlayer/>
		</Submenu>
		{/if}
	{/if}
</div>