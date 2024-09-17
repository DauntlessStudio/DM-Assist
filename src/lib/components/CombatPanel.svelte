<script lang="ts">
    import type { ICombatent } from "$lib/dnd";
	import Combatent from "./Combatent.svelte";

    let combatents: {[key: string]: ICombatent} = {};

    function addCombatent() {
        const id = crypto.randomUUID();
        combatents[id] = {id, name: "My Name"};
    }

    function clearAllCombatents() {
        combatents = {};
    }

    function deleteCombatent(id: string) {
        const subComb = combatents;
        delete subComb[id];
        combatents = subComb;
    }
</script>

<div>
    <div>
        <button on:click={addCombatent}>Add Player</button>
        <button on:click={addCombatent}>Add Monster</button>
        <button on:click={clearAllCombatents}>Clear All</button>
    </div>
    <div>
        {#each Object.values(combatents) as combatent}
            <Combatent data={combatent} deleteCombatent={deleteCombatent}/>
        {/each}
    </div>
</div>