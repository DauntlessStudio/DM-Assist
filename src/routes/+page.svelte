<script lang="ts">
  	import type { PageData } from './$types';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import CombatInfo from '$lib/components/CombatInfo.svelte';
	import Submenu from '$lib/components/Submenu.svelte';
    import DiceBox from '$lib/components/DiceBox.svelte';
	import CombatPanel from '$lib/components/CombatPanel.svelte';
	import MonsterList from '$lib/components/MonsterList.svelte';
	import { EventManager, type Submenus } from '$lib/utils/events';
	import AddPlayer from '$lib/components/AddPlayer.svelte';
	import CombatentDetails from '$lib/components/CombatentDetails.svelte';
	import type { ICombatent } from '$lib/dnd';

	export let data: PageData;
	let showSubmenu: boolean = false;
	let subMenuType: Submenus;
	let currentCombatent: ICombatent|undefined;

	EventManager.events.openSubmenu.subscribe((str, combatent) => {
		showSubmenu = true;
		subMenuType = str;
		currentCombatent = combatent;
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
				<CombatInfo/>
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
		{:else if subMenuType === "combatentDetails" && currentCombatent}
		<Submenu bind:visible={showSubmenu} height={400} width={600}>
			<CombatentDetails combatent={currentCombatent.entry}/>
		</Submenu>
		{/if}
	{/if}
</div>