<style>
    h1 {
        color: red;
    }
    h2 {
        color: red;
    }
    p {
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

<div style="height: 100%;">
    <div class="scrollable-pane">
        <div class="scrollable-content">
            <div class="contents">
                <h1>COMBAT BASICS</h1>
                <h2>GENERAL</h2>
                <p>
                    - A <b>round</b> <i>not a turn</i> lasts 6 seconds.<br>
                     - <b>Surprise</b> generally means comparing Wisdom (Perception) against Dexterity (Stealth). If a combatant is aware of a threat, they <i>cannot</i> be surprised. One combatant can be surprised while others on their side are not.<br>
                     - On your turn you can perform <b>one action</b>, <b>one bonus action</b> (if granted by an ability), <b>one object interaction</b>, and before the start of your next turn <b>one reaction</b>. Unless an ability explicitly allows you to perform multiple of these, you must select <i>no more than one</i> of each action type no matter how many options you have.<br>
                     - Combatants can only pass through another's space if (a) the one occupying that space lets them, (b) there are at least two levels of size difference between them. Another creature's space counts as difficult terrain, and you cannot end your turn in another's space willingly.<br>
                     - <b>Opportunity Attacks</b> are a <i>reaction</i> provoked when one creature <i>leaves</i> another's space.<br>
                     - Working on a <b>grid</b> means each square represents 5 ft. Diagonal movement costs 1.5 movement (done as one square costs 5 and the second costs 10, alternating) and cannot cross walls or corners.<br>
                </p>
                <h2>COMMON ACTIONS</h2>
                <p>
                    - <b>Attack</b>. When attacking: a target is picked, then you add your ability modifiers (Strength for Melee, Dexterity for Ranged, unless otherwise stated) and  your proficiency bonus if applicable to the attack roll. If it meets or exceeds the target's armor class, the attack hits. Rolling a 1 is an automatic miss and rolling a 20 is an automatic hit regardless of modifiers.<br>
                     On a hit, you roll the attack dice (from the weapon or power) and add the relevant modifiers (Strength for Melee, Dexterity for Ranged, Powers <i>may</i> describe a modifier to add).<br>
                     If the attack was a <b>Critical Hit</b> (Rolling a 20 or the critical hit range of the weapon) then you roll the attack dice twice <i>then</i> add your modifiers (modifiers don't get applied twice).<br>
                     After calculating the damage factor in <b>resistances</b> (deals double damage), <b>vulnerabilities</b> (deals half damage), or <b>immunities</b> (negates damage) based on the damage type.<br>
                     - <b>Ranged Attacks</b> have an effective range/max range system. If the distance exceeds the effective range you attack with disadvantage, if it exceeds the max range you cannot attack that target. Ranged attacks have disadvantage on non-incapacitated creatures within 5 ft.<br>
                     - <b>Double Weapon</b> if a weapon has the <i>light</i> and <i>double</i> properties and you are two-handing it and you have just taken the attack action, then you can perform another attack as a <i>bonus action</i>. You <b>do not</b> add your ability modifiers, but you <b>do</b> add your proficiency bonus to the <i>attack roll</i>. You <b>do</b> add your ability modifiers to the <i>damage roll</i>.<br>
                     - <b>Casting Powers</b>. Some powers have a casting time of action, which can be performed according to that power's specific rule.<br>
                     - <b>Dash</b>. Dashing increases your movement this turn by your speed plus any modifiers.<br>
                     - <b>Disengage</b>. Prevents provoking opportunity attacks for the rest of your turn.<br>
                     - <b>Dodge</b>. Until the start of your next turn, attack rolls against you have disadvantage if you can see the attacker. You make Dexterity saving throws with advantage.<br>
                     - <b>Guard</b>. Defend a creature within 5 ft. Any attack roll against the guarded has disadvantage if you can see the attacker and the guarded is within 5 ft. If the attack would hit, you can chose to let it hit you instead, and you take max damage instead of rolling.<br>
                     - <b>Help</b>. The helped creature gains advantage on the next ability check on the task you are helping with. This includes attack rolls.<br>
                     - <b>Hide</b>. Make a Dexterity (Stealth) check to hide.<br>
                     - <b>Ready</b>. Define a trigger and the action you will take in response to that trigger. You store that as a <i>reaction</i>. If you ready a power, you cast it (consuming Force/Tech points). Readied powers require concentration, so any other concentration power ends and you might break concentration if hit before using the power.<br>
                     - <b>Search</b>. Make a (GM's choice) Wisdom (Perception) or Intelligence (Investigation) check to find something.<br>
                     - <b>Use An Object</b>. This can either be a second <i>object interaction</i>, or the use of an item that requires an action (i.e. Grenades or Medpacs).<br>
                </p>    
            </div>
        </div>
    </div>
</div>