<script lang="ts">
    import { base } from '$app/paths';
    import { getRandomInteger } from "$lib/utils";

    export let value: number;
    export let dieRoll: (val: number, dieIndex: number) => void;
    export let dieReset: (dieIndex: number) => void;

    function onRoll() {
        dieRoll(getRandomInteger(1, value), value);
    }

    export function onReset(event: MouseEvent) {
        event.stopPropagation();
        dieReset(value);
    }
</script>

<style>
    .red-filter {
        filter: brightness(0) saturate(100%) invert(15%) sepia(100%) saturate(6932%) hue-rotate(0deg) brightness(100%) contrast(115%);
        width: 100px;
        height: 100px;
    }
    .red-filter:hover {
        filter: brightness(0) saturate(100%) invert(15%) sepia(100%) saturate(6932%) hue-rotate(0deg) brightness(70%) contrast(115%);
    }
    button, button:focus {
        border: 0;
        background-color: transparent;
    }
</style>

<div>
    <button on:click={onRoll}>
        <img src={`${base}/images/d${value}.png`} alt={`A D${value} Die`} class="red-filter"/>
    </button>
</div>