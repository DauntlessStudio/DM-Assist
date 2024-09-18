<script lang="ts">
    import { getRandomInteger } from "$lib/utils";

    export let value: number;
    export let dieRoll: (val: number, dieIndex: number) => void;
    export let dieReset: (dieIndex: number) => void;

    let dieCount: number = 0;
    
    function onRoll() {
        dieRoll(getRandomInteger(1, value), value);
        dieCount++;
    }

    export function onReset(event: MouseEvent) {
        event.stopPropagation();
        dieReset(value);
        dieCount = 0;
    }
</script>

<style>
    .red-filter {
        filter: brightness(0) saturate(100%) invert(15%) sepia(100%) saturate(6932%) hue-rotate(0deg) brightness(100%) contrast(115%);
        width: 100px;
        height: 100px;
    }
</style>

<div>
    <button on:click={onRoll}>
        <img src={`/images/d${value}.png`} alt={`A D${value} Die`} class="red-filter"/>
        {#if dieCount > 0}
            <button on:click={onReset}>{`x${dieCount}`}</button>
        {/if}
    </button>
</div>