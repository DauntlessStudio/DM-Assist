<script lang="ts">
	import { DEFAULT_PLAYER, Monster } from "$lib/dnd/monster";
	import { EventManager } from "$lib/utils";

    let playerName: string = ""
    let initiative: number = 1;

    function submitPlayer() {
        const id = crypto.randomUUID();
        const entry = new Monster({...DEFAULT_PLAYER, name: playerName});
        EventManager.events.addCombatent.raise({id, entry, initiative});

        playerName = "";
        initiative = 1;
    }
</script>

<div>
    <p>Add Player</p>
    <input type="text" placeholder="Player Name..." bind:value={playerName}>
    <input type="number" name="Initiative" min=1 bind:value={initiative}>
    <button on:click={submitPlayer}>Submit</button>
</div>