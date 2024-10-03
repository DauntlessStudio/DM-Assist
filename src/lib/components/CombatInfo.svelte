<script lang="ts">
    enum DisplayOptions {
        combatBasics,
        conditions,
    }
    let displayOption: DisplayOptions = DisplayOptions.combatBasics;
</script>

<style>
    h1, h2, .action-type, .condition_type {
        color: red;
    }
    .reduced-margin {
        margin-top: -20px;
    }
    .contents {
        padding-right: 15px;
    }
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
</style>

<div style="height: 98%;">
    <div>
        <button on:click={() => displayOption = DisplayOptions.combatBasics}>Combat Basics</button>
        <button on:click={() => displayOption = DisplayOptions.conditions}>Conditions</button>
    </div>
    <div class="scrollable-pane">
        <div class="scrollable-content">
            <div class="contents">
                {#if displayOption === DisplayOptions.combatBasics}
                <h1>COMBAT BASICS</h1>
                <h2>GENERAL</h2>
                <p class="reduced-margin">
                    - A <b>round</b> <i>not a turn</i> lasts 6 seconds.<br>
                     - <b>Surprise</b> generally means comparing Wisdom (Perception) against Dexterity (Stealth). If a combatant is aware of a threat, they <i>cannot</i> be surprised. One combatant can be surprised while others on their side are not.<br>
                     - On your turn you can perform <b>one action</b>, <b>one bonus action</b> (if granted by an ability), <b>one object interaction</b>, and before the start of your next turn <b>one reaction</b>. Unless an ability explicitly allows you to perform multiple of these, you must select <i>no more than one</i> of each action type no matter how many options you have.<br>
                     - Combatants can only pass through another's space if (a) the one occupying that space lets them, (b) there are at least two levels of size difference between them. Another creature's space counts as difficult terrain, and you cannot end your turn in another's space willingly.<br>
                     - <b>Opportunity Attacks</b> are a <i>reaction</i> provoked when one creature <i>leaves</i> another's space.<br>
                     - Working on a <b>grid</b> means each square represents 5 ft. Diagonal movement costs 1.5 movement (done as one square costs 5 and the second costs 10, alternating) and cannot cross walls or corners.<br>
                     - <b>Cover</b> grants a bonus to AC and Dexterity saving throws depending on the amount of cover. <b>1/4 cover</b> provides a +2 bonus. <b>1/2 cover</b> provides a +3 bonus. <b>3/4 cover</b> provides a +5 bonus. <b>Full cover</b> means you cannot be hit directly by an attack or power.<br>
                </p>
                <h2>COMMON ACTIONS</h2>
                <p class="reduced-margin">
                    - <b class="action-type">Attack</b>. When attacking: a target is picked, then you add your ability modifiers (Strength for Melee, Dexterity for Ranged, unless otherwise stated) and  your proficiency bonus if applicable to the attack roll. If it meets or exceeds the target's armor class, the attack hits. Rolling a 1 is an automatic miss and rolling a 20 is an automatic hit regardless of modifiers.<br>
                     On a hit, you roll the attack dice (from the weapon or power) and add the relevant modifiers (Strength for Melee, Dexterity for Ranged, Powers <i>may</i> describe a modifier to add).<br>
                     If the attack was a <b>Critical Hit</b> (Rolling a 20 or the critical hit range of the weapon) then you roll the attack dice twice <i>then</i> add your modifiers (modifiers don't get applied twice).<br>
                     After calculating the damage factor in <b>resistances</b> (deals double damage), <b>vulnerabilities</b> (deals half damage), or <b>immunities</b> (negates damage) based on the damage type.<br>
                     - <b class="action-type">Ranged Attacks</b>. These have an effective range/max range system. If the distance exceeds the effective range you attack with disadvantage, if it exceeds the max range you cannot attack that target. Ranged attacks have disadvantage on non-incapacitated creatures within 5 ft.<br>
                     - <b class="action-type">Double Weapon</b>. If a weapon has the <i>light</i> and <i>double</i> properties and you are two-handing it and you have just taken the attack action, then you can perform another attack as a <i>bonus action</i>. You <b>do not</b> add your ability modifiers, but you <b>do</b> add your proficiency bonus to the <i>attack roll</i>. You <b>do</b> add your ability modifiers to the <i>damage roll</i>.<br>
                     - <b class="action-type">Casting Powers</b>. Some powers have a casting time of action, which can be performed according to that power's specific rule.<br>
                     - <b class="action-type">Grappling</b>. You can use the <i>attack</i> action to make a special melee attack. Target must be no more that one size greater than the player. Using one free hand the grappler makes <i>Strength (Athletics)</i> check contested by the target's <i>Strength (Athletics)</i> or <i>Dexterity (Acrobatics)</i>. <b>Escaping a grapple</b> requires the same checks in reverse. <b>Moving a grappled creature</b> can be done with the grappler's movement, but their movement is halved.<br>
                     - <b class="action-type">Dash</b>. Dashing increases your movement this turn by your speed plus any modifiers.<br>
                     - <b class="action-type">Disengage</b>. Prevents provoking opportunity attacks for the rest of your turn.<br>
                     - <b class="action-type">Dodge</b>. Until the start of your next turn, attack rolls against you have disadvantage if you can see the attacker. You make Dexterity saving throws with advantage.<br>
                     - <b class="action-type">Guard</b>. Defend a creature within 5 ft. Any attack roll against the guarded has disadvantage if you can see the attacker and the guarded is within 5 ft. If the attack would hit, you can chose to let it hit you instead, and you take max damage instead of rolling.<br>
                     - <b class="action-type">Help</b>. The helped creature gains advantage on the next ability check on the task you are helping with. This includes attack rolls.<br>
                     - <b class="action-type">Hide</b>. Make a Dexterity (Stealth) check to hide.<br>
                     - <b class="action-type">Ready</b>. Define a trigger and the action you will take in response to that trigger. You store that as a <i>reaction</i>. If you ready a power, you cast it (consuming Force/Tech points). Readied powers require concentration, so any other concentration power ends and you might break concentration if hit before using the power.<br>
                     - <b class="action-type">Search</b>. Make a (GM's choice) Wisdom (Perception) or Intelligence (Investigation) check to find something.<br>
                     - <b class="action-type">Use An Object</b>. This can either be a second <i>object interaction</i>, or the use of an item that requires an action (i.e. Grenades or Medpacs).<br>
                </p>   
                {:else if displayOption === DisplayOptions.conditions}
                <h1>Conditions</h1>
                <p>Conditions alter a creature's capabilities in a variety of ways and can arise as a result of a power, a class feature, a monster's attack, or other effect. Most conditions, such as blinded, are impairments, but a few, such as invisible, can be advantageous.</p>
                <p>A condition lasts either until it is countered (the prone condition is countered by standing up, for example) or for a duration specified by the effect that imposed the condition.</p>
                <p>If multiple effects impose the same condition on a creature, each instance of the condition has its own duration, but the condition's effects don't get worse. A creature either has a condition or doesn't.</p>
                <p>The following definitions specify what happens to a creature while it is subjected to a condition.</p>
                <b class="condition_type">Blinded</b>
                <ul>
                <li>A blinded creature can't see and automatically fails any ability check that requires sight.</li>
                <li>Unless a creature benefits from powers or a special sense, attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.</li>
                </ul>
                <b class="condition_type">Charmed</b>
                <ul>
                <li>A charmed creature can't attack the charmer or target the charmer with harmful abilities or enhanced effects.</li>
                <li>The charmer has advantage on any ability check to interact socially with the creature.</li>
                </ul>
                <b class="condition_type">Corroded</b>
                <p>Some abilities, effects, and hazards can lead to a special condition called corroded. Corroded is measured in three levels. An effect can give a creature one or more corroded levels, as specified in the effect's description.</p>
                <p>For each corroded level a creature has, it takes 1 additional damage from weapons.</p>
                <b class="condition_type">Deafened</b>
                <ul>
                <li>A deafened creature can't hear and automatically fails any ability check that requires hearing.</li>
                </ul>
                <b class="condition_type">Diseased</b>
                <ul>
                <li>A diseased creature suffers effects that vary based on the disease.</li>
                </ul>
                <b class="condition_type">Exhaustion</b>
                <p>Some special abilities and environmental hazards, and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An effect can give a creature one or more levels of exhaustion, as specified in the effect's description.</p>
                <i>Exhaustion Level</i>
                <table class="table">
                <thead>
                <tr>
                <th style="text-align:center">Level</th>
                <th style="text-align:left">Effect</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td style="text-align:center">1</td>
                <td style="text-align:left">Disadvantage on ability checks</td>
                </tr>
                <tr>
                <td style="text-align:center">2</td>
                <td style="text-align:left">1 slowed level</td>
                </tr>
                <tr>
                <td style="text-align:center">3</td>
                <td style="text-align:left">Disadvantage on attack rolls and saving throws</td>
                </tr>
                <tr>
                <td style="text-align:center">4</td>
                <td style="text-align:left">Hit point maximum halved</td>
                </tr>
                <tr>
                <td style="text-align:center">5</td>
                <td style="text-align:left">4 slowed levels</td>
                </tr>
                <tr>
                <td style="text-align:center">6</td>
                <td style="text-align:left">Death</td>
                </tr>
                </tbody>
                </table>
                <p>If an already exhausted creature suffers another effect that causes exhaustion, its current exhaustion level increases by the amount specified in the effect's description.</p>
                <p>A creature suffers the effect of its current exhaustion level as well as all lower levels. For example, a creature suffering level 2 exhaustion has 1 slowed level and has disadvantage on ability checks.</p>
                <p>An effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.</p>
                <p>Finishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink.</p>
                <b class="condition_type">Frightened</b>
                <ul>
                <li>A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.</li>
                <li>The creature can't willingly move closer to the source of its fear.</li>
                </ul>
                <b class="condition_type">Grappled</b>
                <ul>
                <li>A grappled creature has its speed reduced to 0.</li>
                <li>The condition ends if the grappler is incapacitated (see the condition).</li>
                <li>The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect.</li>
                </ul>
                <b class="condition_type">Ignited</b>
                <ul>
                <li>A creature that is ignited suffers fire damage at the end of each of its turns. A damage value in parentheses appears with this condition—the fire damage the creature takes at the end of its turn.</li>
                <li>If the target or a creature within 5 feet of it uses an action to put out the flames, or if some other effect douses the flames, the creature is no longer ignited.</li>
                </ul>
                <b class="condition_type">Incapacitated</b>
                <ul>
                <li>An incapacitated creature can't take actions or reactions.</li>
                <li>An incapacitated creature automatically fails Strength, Dexterity, and Constitution checks.</li>
                </ul>
                <b class="condition_type">Invisible</b>
                <ul>
                <li>An invisible creature is considered unseen to other creatures, without the aid of powers or a special sense that allow it to detect the creature, as described in “Unseen Attackers and Targets” in Chapter 9. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves.</li>
                <li>Unless a creature benefits from powers or a special sense that allow it to detect the creature, attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage.</li>
                </ul>
                <b class="condition_type">Paralyzed</b>
                <ul>
                <li>A paralyzed creature is incapacitated (see the condition) and can't move or speak.</li>
                <li>The creature automatically fails Strength and Dexterity saving throws, as if it had rolled a 1 on the save. Attack rolls against the creature have advantage.</li>
                <li>Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</li>
                </ul>
                <b class="condition_type">Petrified</b>
                <ul>
                <li>A petrified creature is transformed, along with any object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.</li>
                <li>The creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.</li>
                <li>Attack rolls against the creature have advantage.</li>
                <li>The creature automatically fails Strength and Dexterity saving throws, as if it had rolled a 1 on the save.</li>
                <li>The creature has resistance to all damage.</li>
                <li>The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.</li>
                </ul>
                <b class="condition_type">Poisoned</b>
                <ul>
                <li>A poisoned creature has disadvantage on attack rolls and ability checks.</li>
                </ul>
                <b class="condition_type">Prone</b>
                <ul>
                <li>A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.</li>
                <li>The creature has disadvantage on melee attack rolls.</li>
                <li>The creature has disadvantage on ranged attack rolls against targets within 30 feet.</li>
                <li>An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.</li>
                </ul>
                <b class="condition_type">Restrained</b>
                <ul>
                <li>A restrained creature has 4 slowed levels.</li>
                <li>Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.</li>
                <li>The creature has disadvantage on Dexterity saving throws.</li>
                </ul>
                <b class="condition_type">Shocked</b>
                <ul>
                <li>A shocked creature can't take reactions.</li>
                <li>On its turn, a shocked creature can take either an action or a bonus action, but not both.</li>
                </ul>
                <b class="condition_type">Slowed</b>
                <p>Some abilities, effects, and hazards can lead to a special condition called slowed. Slowed is measured in four levels. An effect can give a creature one or more levels of slowed, as specified in the effect's description.</p>
                <i>Slowed Level</i>
                <table class="table">
                <thead>
                <tr>
                <th style="text-align:center">Level</th>
                <th style="text-align:left">Effect</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td style="text-align:center">1</td>
                <td style="text-align:left">Speed reduced by 15 feet</td>
                </tr>
                <tr>
                <td style="text-align:center">2</td>
                <td style="text-align:left">Speed reduced by 25 feet</td>
                </tr>
                <tr>
                <td style="text-align:center">3</td>
                <td style="text-align:left">Speed reduced by 30 feet</td>
                </tr>
                <tr>
                <td style="text-align:center">4</td>
                <td style="text-align:left">Speed reduced to 0, and can't benefit from any bonus to speed</td>
                </tr>
                </tbody>
                </table>
                <p>If an already slowed creature suffers another effect that causes it to be slowed, its current slowed level increases by the amount specified in the effect's description.</p>
                <p>An effect that removes slowed reduces its level as specified in the effect's description, with all slowed effects ending if a creature's slowed level is reduced below 1.</p>
                <b class="condition_type">Stunned</b>
                <ul>
                <li>A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.</li>
                <li>The creature automatically fails Strength and Dexterity saving throws, as if it had rolled a 1 on the save.</li>
                <li>Attack rolls against the creature have advantage.</li>
                </ul>
                <b class="condition_type">Unconscious</b>
                <ul>
                <li>An unconscious creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings</li>
                <li>The creature drops whatever it's holding and falls prone.</li>
                <li>The creature automatically fails Strength and Dexterity saving throws, as if it had rolled a 1 on the save.</li>
                <li>Attack rolls against the creature have advantage.</li>
                <li>Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</li>
                </ul>
                <b class="condition_type">Weakened</b>
                <ul>
                <li>A creature suffering from the weakened condition heals at a slower rate. When an effect restores hit points to the creature, the amount of hit points restored is halved.</li>
                <li>Creatures suffering from this condition can only add half their ability modifier to ability checks, attack rolls, and saving throws, unless that modifier would be negative.</li>
                </ul>
                
                {/if} 
            </div>
        </div>
    </div>
</div>