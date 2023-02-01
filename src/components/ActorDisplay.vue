<template>
  <div>
    <vue-final-modal v-model="this.showModal" classes="modal-container" content-class="modal-content">
      <power-display :power="this.modalPower"></power-display>
    </vue-final-modal>
  </div>
  <h1>{{ this.actorName }}</h1>
  <div class="initiative">
    <p><strong>Initiative: </strong> {{ this.initiative }}</p>
  </div>
  <div class="armor">
    <p><strong>Armor Class: </strong> {{ this.armorClass }}</p>
  </div>
  <div class="hp">
    <button @click="removeHP">-</button>
    <div class="shell">
      <span>{{ `${currentHealth}/${maxHealth}` }}</span>
      <div class="bar" :style="{ width: (currentHealth / maxHealth * 100) + '%' }">
      </div>
    </div>
    <button @click="addHP">+</button>
  </div>
  <div class="stats">
    <div class="strength">
      <strong>STR</strong>
      <p>{{ `${this.str} (${this.str >= 10 ? '+' : '-'}${Math.floor((this.str - 10) * 0.5)})` }}</p>
    </div>
    <div class="dexterity">
      <strong>DEX</strong>
      <p>{{ `${this.dex} (${this.dex >= 10 ? '+' : '-'}${Math.floor((this.dex - 10) * 0.5)})` }}</p>
    </div>
    <div class="constitution">
      <strong>CON</strong>
      <p>{{ `${this.con} (${this.con >= 10 ? '+' : '-'}${Math.floor((this.con - 10) * 0.5)})` }}</p>
    </div>
    <div class="intelligence">
      <strong>INT</strong>
      <p>{{ `${this.int} (${this.int >= 10 ? '+' : '-'}${Math.floor((this.int - 10) * 0.5)})` }}</p>
    </div>
    <div class="wisdom">
      <strong>WIS</strong>
      <p>{{ `${this.wis} (${this.wis >= 10 ? '+' : '-'}${Math.floor((this.wis - 10) * 0.5)})` }}</p>
    </div>  
    <div class="charisma">
      <strong>CHA</strong>
      <p>{{ `${this.cha} (${this.cha >= 10 ? '+' : '-'}${Math.floor((this.cha - 10) * 0.5)})` }}</p>
    </div>
  </div>
  <div class="extras">
    <p><strong>Skills: </strong>{{ this.skills.join(', ') }}</p>
    <p><strong>Damage Vulnerabilities: </strong>{{ this.vulnerabilities.join(', ') }}</p>
    <p><strong>Damage Resistances: </strong>{{ this.resistances.join(', ') }}</p>
    <p><strong>Senses: </strong>{{ this.senses.join(', ') }}</p>
    <p><strong>Languages: </strong>{{ this.languages.join(', ') }}</p>
    <p><strong>Challenge: </strong>{{ this.challenge }}</p>
    <div class="traits">
      <h3>TRAITS</h3>
      <markdown @click="clickLink" :source="this.traits"></markdown>
    </div>
    <div class="actions">
      <h3>ACTIONS</h3>
      <p>Tortuous Strike</p>
    </div>
  </div>
</template>

<script>
import PowerDisplay from '@/components/PowerDisplay.vue'
import Markdown from 'vue3-markdown-it'
import * as Powers from '@/assets/powers.json'
import { VueFinalModal } from 'vue-final-modal'

export default {
  name: 'ActorDisplay',
  components: {
    Markdown,
    VueFinalModal,
    PowerDisplay
  },
  data() {
    return {
      showModal: false,
      modalPower: {},
      actorName: 'Actor Name',
      initiative: 10,
      armorClass: 10,
      currentHealth: 25,
      maxHealth: 25,
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
      skills: ['Lore +5', 'Insight +4'],
      vulnerabilities: ['Ion'],
      resistances: ['Necrotic'],
      senses: ['darkvistion 60 ft', 'passive Perception 11'],
      languages: ['All registered languages'],
      challenge: '2 (450 XP)',
      traits: ' Techcasting. The droid is a 5th-level techcaster. Its techcasting ability is Intelligence (tech save DC 13, +5 to hit with tech powers). It has 22 tech points and knows the following tech powers: [](#)\r\nAt will: [assess the situation](#assess%20the%20situation), [electroshock](#electroshock), [venomous strike](#venomous%20strike)\r\n1st-level: [poison dart](#poison%20dart), [spot the weakness](#spot%20the%20weakness), [toxin scan](#toxin%20scan), [tranquilizer](#tranquilizer)\r\n2nd-level: [paralyze humanoid](#paralyze%20humanoid), [toxin purge](#toxin%20purge), [truth serum](#truth%20serum)\r\n3rd-level: [tactical advantage](#tactical%20advantage)'
    }
  },
  methods: {
    addHP(e) {
      console.log(e)
      if(this.currentHealth < this.maxHealth) {
        this.currentHealth += e.ctrlKey ? 5 : 1
        this.currentHealth = Math.min(this.currentHealth, this.maxHealth)
      }
    },
    removeHP(e) {
      if(this.currentHealth > 0) {
        this.currentHealth -= e.ctrlKey ? 5 : 1
        this.currentHealth = Math.max(this.currentHealth, 0)
      }
    },
    clickLink(e) {
      let powerName = e.view.location.href.replace(/.+#/, '').replace(/%20/g, ' ')
      console.log(powerName)
      for (const index in Powers) {
        const power = Powers[index]
        if (String(power.name).toLowerCase() === powerName) {
          this.modalPower = power
          this.showModal = true
          console.log(power)
        }
      }
    }
  }
}
</script>

<style>
.hp {
  display: flex;
  justify-content: center;
  align-items: center;
}
.shell {
  display: inline-block;
  position: relative;
  height: 25px;
  width: 250px;
  border: 1px solid rgb(122, 122, 122);
  padding: 0;
  background-color: #494747;
}
.bar {
  background: linear-gradient(to right, #c24545, #420e1d);
  height: 25px;
  width: 15px;
}
.shell span {
  position: absolute;
  text-align: center;
  left: 42.5%;
  padding: 4px 0px;
  color: white;
  font-size: 1em;
  font-weight: bold;
}
.hp button {
  margin: 5px;
  background: transparent;
  color: gray;
  border-style: none;
  font-weight: bold;
  font-size: 1.5em;
}
.hp button:hover {
  color: white;
}
.stats {
  text-align: center;
}
.stats div {
  display: inline-block;
  margin: 5px;
}
.extras h3 {
  border-bottom: 3px solid gray;
}
.extras a:link {
  color: gray;
  text-decoration: none;
}
.extras a:visited {
  color: gray;
  text-decoration: none;
}
</style>