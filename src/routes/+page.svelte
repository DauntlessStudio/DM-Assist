<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
    import DiceBox from '$lib/components/DiceBox.svelte';
	import CombatPanel from '$lib/components/CombatPanel.svelte';
	import MonsterList from '$lib/components/MonsterList.svelte';
	import { Monster } from '$lib/dnd/monster';

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
        <MonsterList selectMonster={selectMonster}/>
	</Pane>
	<Pane minSize={25} size={25}>
        <CombatPanel bind:addCombatent={addCombatent}/>
    </Pane>
</Splitpanes>
