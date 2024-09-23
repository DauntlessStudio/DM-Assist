<script lang="ts">
    import type { ICombatent } from "$lib/dnd";
    import RadialBar from "@okrad/svelte-progressbar"
    import Icon from 'svelte-awesome/components/Icon.svelte';
    import trash from "svelte-awesome/icons/trash";
    import streetView from "svelte-awesome/icons/streetView";
    import shield from "svelte-awesome/icons/shield";
	import { EventManager } from "$lib/utils";

    export let deleteCombatent: (id: string) => void;
    export let combatent: ICombatent;

    combatent.entry.subscribe(updateCombatent);

    let color = "#FF0000";

    function updateCombatent() {
        combatent = combatent;
    }

    function onDelete() {
        deleteCombatent(combatent.id);
    }

    function onSelected() {
        EventManager.events.openSubmenu.raise("combatentDetails", combatent);
    }

    function onHealthClick() {
        EventManager.events.openSubmenu.raise("healthMenu", combatent);
    }
</script>

<style>
    .parent {
        margin-top: 0.5em;
        padding-left: 0.5em;
        padding-right: 1.5em;
        padding-bottom: 0.5em;
        position: relative;
        line-height: 0px;
        background-color: white;
    }
    .top-right {
        position: absolute;
        top: 0;
        right: 0;
    }
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px
    }
    .row-small-gap {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
    }
    input, input:focus {
        width: 100%;
        font-size: 1.2em;
        border: none;
        background-color: transparent;
        outline: none;
    }
    p {
        margin-top: .8em;
    }
    #health-button {
        background-color: transparent;
        border: 0;
    }
    #monster-button, #monster-button:focus {
        background-color: transparent;
        border: 0;
        margin-top: 0;
        margin-bottom: 0;
    }
    #monster-button:hover p {
        color: red;
    }
</style>

<div class=parent>
    <input bind:value={combatent.entry.Name} placeholder={combatent.entry.data.name}/>
    <button on:click={onSelected} id="monster-button">
        <p style="font-size: 1.0em;">{combatent.entry.data.name}</p>
    </button>
    <div class=row>
        <p style="font-size: 2.0em;">{combatent.initiative}</p>
        <button on:click={onHealthClick} id="health-button">
            <RadialBar series={combatent.entry.HealthPercentage} valueLabel={`${combatent.entry.CurrentHP}/${combatent.entry.MaxHP}`} style={"radial"} width={80} thickness={8} colors={[color]}/>
        </button>
        <div class=row-small-gap>
            <Icon data={streetView} scale={1.5}/>
            <p>{combatent.entry.data.speeds}</p>
        </div>
        <div class=row-small-gap>
            <Icon data={shield} scale={1.5}/>
            <p>{combatent.entry.data.armorClass} AC</p>
        </div>
    </div>
    <button on:click={onDelete} class=top-right><Icon data={trash} scale={1.5} style="color:red"/></button>
</div>