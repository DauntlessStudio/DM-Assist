<script lang="ts">
    import type { ICombatent } from "$lib/dnd";
	import Combatent from "./Combatent.svelte";
	import { Monster } from "$lib/dnd/monster";

    let combatents: {[key: string]: ICombatent} = {};

    export function addCombatent(monster: Monster) {
        const id = crypto.randomUUID();
        const entry = monster;
        const initiative = entry.Initiative;
        combatents[id] = {id, entry, initiative};
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

<style>
    .scrollable-pane {
      height: 95vh; /* Or any other appropriate height */
      display: flex;
      flex-direction: column;
    }
  
    .scrollable-content {
      flex: 1 1 auto;
      overflow-y: auto;
      min-height: 0; /* This is crucial for Firefox */
    }
  
    /* Optional: Customize scrollbar */
    .scrollable-content::-webkit-scrollbar {
      width: 8px;
    }
  
    .scrollable-content::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }
  
    .scrollable-content::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
</style>

<div>
    <div>
        <button>Add Player</button>
        <button>Add Monster</button>
        <button on:click={clearAllCombatents}>Clear All</button>
    </div>
    <div class="scrollable-pane">
        <div class="scrollable-content">
            {#each Object.values(combatents) as combatent}
                <Combatent combatent={combatent} deleteCombatent={deleteCombatent}/>
            {/each}
        </div>
    </div>
</div>