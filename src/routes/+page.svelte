<script lang="ts">
  	import type { PageData } from './$types';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
    import DiceBox from '$lib/components/DiceBox.svelte';
	import CombatPanel from '$lib/components/CombatPanel.svelte';
	import MonsterList from '$lib/components/MonsterList.svelte';
	import { Monster } from '$lib/dnd/monster';

	export let data: PageData;

	let addCombatent: (monster: Monster) => void;

	function selectMonster(monster: Monster) {
		addCombatent(monster);
	}
</script>

<Splitpanes style="height:98vh">
	<Pane minSize={20} size={20}>
		<DiceBox/>
	</Pane>
	<Pane>
        <MonsterList selectMonster={selectMonster} monsters={data.monsters}/>
	</Pane>
	<Pane minSize={25} size={25}>
        <CombatPanel bind:addCombatent={addCombatent}/>
    </Pane>
</Splitpanes>
