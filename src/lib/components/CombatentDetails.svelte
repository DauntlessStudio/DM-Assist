<script lang="ts">
	import { Dice } from "$lib/dnd/dice";
	import { Monster } from "$lib/dnd/monster";
	import { EventManager } from "$lib/utils";

    export let combatent: Monster;

    $: traits = combatent.data.behaviors.filter(b => b.monsterBehaviorType === "Action");
    $: actions = combatent.data.behaviors.filter(b => b.monsterBehaviorType === "Trait");

    function roll(rollStr: string) {
        EventManager.events.addDieRoll.raise(Dice.rollString(rollStr), 20);
    }
</script>

<style>
    .scrollable-pane {
        flex-grow: 1;
        height: 100%;
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
    .contents {
        width: 95%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .contents * {
        margin-top: -5px;
    }
    .contents *:first-child {
        margin-top: 0;
    }
    h1 {
        text-align: left;
        color: red;
    }
    h2 {
        text-align: left;
        color: red;
    }
    p {
        text-align: left;
    }
    .stat-block p{
        text-align: center;
        display: inline-block;
        margin-right: 5px;
    }
</style>

<div style="height:100%;">
    <div class="scrollable-pane">
        <div class="scrollable-content">
            <div class="contents">
                <h1>{combatent.data.name.toUpperCase()}</h1>
                <p><i>{combatent.data.types[0]}, {combatent.data.alignment}</i></p>
                <p><b>Armor Class</b> {combatent.data.armorClass} ({combatent.data.armorType})</p>
                <p><b>Hit Points</b> {combatent.CurrentHP} ({combatent.data.hitPointRoll})</p>
                <p><b>Speed</b> {combatent.data.speeds}</p>
                <div class="stat-block">
                    <p><b>STR</b><br>{combatent.data.strength} ({combatent.data.strengthModifier})</p>
                    <p><b>DEX</b><br>{combatent.data.dexterity} ({combatent.data.dexterityModifier})</p>
                    <p><b>CON</b><br>{combatent.data.constitution} ({combatent.data.constitutionModifier})</p>
                    <p><b>INT</b><br>{combatent.data.intelligence} ({combatent.data.intelligenceModifier})</p>
                    <p><b>WIS</b><br>{combatent.data.wisdom} ({combatent.data.wisdomModifier})</p>
                    <p><b>CHA</b><br>{combatent.data.charisma} ({combatent.data.charismaModifier})</p>
                </div>
                {#if combatent.data.skills}
                <p>
                    <b>Skills</b>
                    {#each combatent.data.skills as skill}
                        <button on:click={() => roll("d20" + skill)}>{skill}</button>
                    {/each}
                </p>
                {/if}
                <p><b>Senses</b> {combatent.data.senses}</p>
                <p><b>Languages</b> {combatent.data.languages}</p>
                <p><b>Challenge</b> {combatent.data.challengeRating} ({combatent.data.experiencePoints} XP)</p>
                {#if traits.length}
                <h2>TRAITS</h2>
                    {#each traits as trait}
                        <p><b>{trait.name}</b></p>
                        <p>{trait.description}</p>
                    {/each}
                {/if}
                {#if actions.length}
                <h2>ACTIONS</h2>
                    {#each actions as action}
                        <p><b>{action.name}</b>. {action.description}</p>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>