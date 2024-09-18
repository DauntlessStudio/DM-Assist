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
        diceValues[dieVal].push(val);
        console.log(total);
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
    <button on:click={resetDieRoll}>{total}</button>
</div>