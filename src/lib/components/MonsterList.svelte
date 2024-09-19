
<script lang="ts">
    import monsters from "$lib/data/monsters.json";
	import { Monster } from "$lib/dnd/monster";

    export let selectMonster: (monster: Monster) => void;

    let monsterList = monsters;
</script>

<style>
    :global(.scrollable-pane) {
      height: 100vh; /* Or any other appropriate height */
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
    <p>Monsters</p>
    <div class="scrollable-pane">
        <div class="scrollable-content">
            {#each monsterList as monster}
                <div>
                    <button on:click={() => selectMonster(new Monster(monster))}>{monster.name} {monster.size} {monster.types[0]} {monster.challengeRating} {monster.alignment}</button>
                </div>
            {/each}
        </div>
    </div>
</div>