<script lang="ts">
	import Die from "./Die.svelte";

    let diceValues: {[key: number]: number[]} = {
        4: [],
        6: [],
        8: [],
        10: [],
        12: [],
        20: [],
    };
    const dice: Die[] = [];

    let gap: number = 2;
    let total: number = 0;

    function onDieRoll(val: number, dieVal: number) {
        total += val;
        const arr = diceValues[dieVal];
        arr.push(val);
        diceValues[dieVal] = arr;
    }

    function onDieReset(dieVal: number) {
        diceValues[dieVal].forEach(val => total -= val);
        diceValues[dieVal] = [];
    }

    function resetDieRoll(event: MouseEvent) {
        total = 0;
        Object.keys(diceValues).forEach(key => diceValues[Number(key)] = []);
        dice.forEach(die => die.onReset(event));
    }

    function removeDieRoll(key: number, index: number) {
        const arr = diceValues[key];
		arr.splice(index, 1);
        diceValues[key] = arr;
    }
</script>

<style>
    .container {
        display:grid;
        grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));
    }
</style>

<div>
    <div class=container style={'grid-gap:'+gap+'px'}>
        {#each Object.keys(diceValues) as dieVal, i}
            <Die value={Number(dieVal)} dieRoll={onDieRoll} dieReset={onDieReset} bind:this={dice[i]}/>
        {/each}
    </div>
    {#if total > 0}
        <button on:click={resetDieRoll}>Clear All</button>
        <div class=container style={'grid-gap:'+gap+'px'}>
            {#each diceValues[4] as dieVal, i}
                <button on:click={() => removeDieRoll(4, i)}>D4: {dieVal}</button>
            {/each}
            {#each diceValues[6] as dieVal, i}
                <button on:click={() => removeDieRoll(6, i)}>D6: {dieVal}</button>
            {/each}
            {#each diceValues[8] as dieVal, i}
                <button on:click={() => removeDieRoll(8, i)}>D8: {dieVal}</button>
            {/each}
            {#each diceValues[10] as dieVal, i}
                <button on:click={() => removeDieRoll(10, i)}>D10: {dieVal}</button>
            {/each}
            {#each diceValues[12] as dieVal, i}
                <button on:click={() => removeDieRoll(12, i)}>D12: {dieVal}</button>
            {/each}
            {#each diceValues[20] as dieVal, i}
                <button on:click={() => removeDieRoll(20, i)}>D20: {dieVal}</button>
            {/each}
        </div>
    {/if}
</div>