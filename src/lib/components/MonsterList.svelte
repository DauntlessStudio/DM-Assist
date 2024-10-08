
<script lang="ts">
	import { Monster, type IMonster } from "$lib/dnd/monster";
	import { removeFromArray } from "$lib/utils";
	import { EventManager } from "$lib/utils/events";
    import NestedButton from "./NestedButton.svelte";

    export let monsters: IMonster[];
    
    const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan",];
    const types = ["droid", "construct", "beast", "humanoid", "swarm of Medium droids", "aberration", "swarm of Medium humanoids", "plant", "humanoid (Villainous", "undead", "human", "elemental", "swarm of Tiny beasts", "swarm of Small beasts", "swarm of Tiny droids", "Humanoid", "tree",];
    const ratings = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "23", "24", "25", "26",];
    const alignments = ["any alignment", "any dark", "any neutral alignment", "chaotic balanced", "chaotic dark", "lawful balanced", "lawful dark", "neutral dark", "unaligned",];

    let searchFilter: string = "";
    let sizeFilters: string[] = [];
    let typeFilters: string[] = [];
    let crFilters: string[] = [];
    let alignFilters: string[] = [];

    let monsterList = monsters;
    let showSizeList = false;
    let showTypeList = false;
    let showCRList = false;
    let showAlignList = false;

    function updateSizeFilters(val: string) {
        if (sizeFilters.includes(val)) {
            removeFromArray(sizeFilters, val);
        } else {
            sizeFilters.push(val);
        }

        updateMonsterList();
    }

    function updateTypeFilters(val: string) {
        if (typeFilters.includes(val)) {
            removeFromArray(typeFilters, val);
        } else {
            typeFilters.push(val);
        }

        updateMonsterList();
    }

    function updateCRFilters(val: string) {
        if (crFilters.includes(val)) {
            removeFromArray(crFilters, val);
        } else {
            crFilters.push(val);
        }

        updateMonsterList();
    }

    function updateAlignFilters(val: string) {
        if (alignFilters.includes(val)) {
            removeFromArray(alignFilters, val);
        } else {
            alignFilters.push(val);
        }

        updateMonsterList();
    }
    
    function updateMonsterList() {
        let filteredList = monsters;
        filteredList = filteredList.filter(monster => {
            let search = monster.name.toLowerCase().includes(searchFilter.toLowerCase()) || searchFilter === "";
            let size = sizeFilters.includes(monster.size) || !sizeFilters.length;
            let type = typeFilters.some(type => monster.types.includes(type)) || !typeFilters.length;
            let cr = crFilters.includes(monster.challengeRating) || !crFilters.length;
            let alignment = alignFilters.includes(monster.alignment) || !alignFilters.length;

            return search && size && type && cr && alignment;
        })

        monsterList = filteredList;
    }

    function selectMonster(monsterData: IMonster) {
        const monster = new Monster(monsterData);
        const id = crypto.randomUUID();
        const entry = monster;
        const initiative = monster.Initiative;
        EventManager.events.addCombatent.raise({id, entry, initiative});
    }
</script>

<style>
    .parent-container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .stack-element {
        flex-shrink: 0;
    }
    .scrollable-pane {
        flex-grow: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
    }
    .scrollable-content {
      flex: 1 1 auto;
      overflow-y: auto;
      min-height: 0;
    }
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

<div class="parent-container">
    <input class="stack-element" type="text" placeholder="Search" bind:value={searchFilter} on:input={updateMonsterList}>
    <div class="stack-element">
        <NestedButton method={() => showSizeList = !showSizeList}>Size</NestedButton>
        {#if showSizeList}
            {#each sizes as size}
                <NestedButton method={() => updateSizeFilters(size)}>{size}</NestedButton>
            {/each}
        {/if}
    </div>
    <div class="stack-element">
        <NestedButton method={() => showTypeList = !showTypeList}>Type</NestedButton>
        {#if showTypeList}
            {#each types as type}
                <NestedButton method={() => updateTypeFilters(type)}>{type}</NestedButton>
            {/each}
        {/if}
    </div>
    <div class="stack-element">
        <NestedButton method={() => showCRList = !showCRList}>Cr</NestedButton>
        {#if showCRList}
            {#each ratings as cr}
                <NestedButton method={() => updateCRFilters(cr)}>{cr}</NestedButton>
            {/each}
        {/if}
    </div>
    <div class="stack-element">
        <NestedButton method={() => showAlignList = !showAlignList}>Align</NestedButton>
        {#if showAlignList}
            {#each alignments as align}
                <NestedButton method={() => updateAlignFilters(align)}>{align}</NestedButton>
            {/each}
        {/if}
    </div>
    <div class="scrollable-pane">
        <div class="scrollable-content">
            {#each monsterList as monster}
                <div>
                    <NestedButton method={() => selectMonster(monster)}>{monster.name} {monster.size} {monster.types[0]} {monster.challengeRating} {monster.alignment}</NestedButton>
                </div>
            {/each}
        </div>
    </div>
</div>