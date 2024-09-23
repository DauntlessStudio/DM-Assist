<script lang="ts">
	import type { ICombatent } from "$lib/dnd";
	import { EventManager } from "$lib/utils";

    export let combatent: ICombatent;
    let health: number;

    function addHealth() {
        combatent.entry.CurrentHP += health;
        EventManager.events.closeSubmenu.raise();
    }

    function removeHealth() {
        combatent.entry.CurrentHP -= health;
        EventManager.events.closeSubmenu.raise();
    }
</script>

<div>
    <p>Health ({combatent.entry.CurrentHP}/{combatent.entry.MaxHP})</p>
    <input type="number" bind:value={health} min=1>
    {#if health}
        <button on:click={addHealth}>Add</button>
        <button on:click={removeHealth}>Remove</button>
    {/if}
</div>