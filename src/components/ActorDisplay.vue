<template>
<div>
  <div>
    <vue-final-modal v-model="this.showModal" classes="modal-container" content-class="modal-content">
      <power-display :power="this.modalPower"></power-display>
    </vue-final-modal>
  </div>
  <h1 class="actorName">{{ getActorName }}</h1>
  <div class="initiative">
    <p><strong>Initiative: </strong> {{ getInitiative }}</p>
  </div>
  <div class="armor">
    <p><strong>Armor Class: </strong> {{ getArmorClass }}</p>
  </div>
  <div class="hp">
    <button @click="removeHP">-</button>
    <div class="shell">
      <span>{{ `${getCurrentHealth}/${getMaxHealth}` }}</span>
      <div class="bar" :style="{ width: (getCurrentHealth / getMaxHealth * 100) + '%' }">
      </div>
    </div>
    <button @click="addHP">+</button>
  </div>
  <div class="stats">
    <div class="strength">
      <strong>STR</strong>
      <p>{{ `${getStr} (${getStr >= 10 ? '+' : '-'}${Math.floor((getStr - 10) * 0.5)})` }}</p>
    </div>
    <div class="dexterity">
      <strong>DEX</strong>
      <p>{{ `${getDex} (${getDex >= 10 ? '+' : '-'}${Math.floor((getDex - 10) * 0.5)})` }}</p>
    </div>
    <div class="constitution">
      <strong>CON</strong>
      <p>{{ `${getCon} (${getCon >= 10 ? '+' : '-'}${Math.floor((getCon - 10) * 0.5)})` }}</p>
    </div>
    <div class="intelligence">
      <strong>INT</strong>
      <p>{{ `${getInt} (${getInt >= 10 ? '+' : '-'}${Math.floor((getInt - 10) * 0.5)})` }}</p>
    </div>
    <div class="wisdom">
      <strong>WIS</strong>
      <p>{{ `${getWis} (${getWis >= 10 ? '+' : '-'}${Math.floor((getWis - 10) * 0.5)})` }}</p>
    </div>  
    <div class="charisma">
      <strong>CHA</strong>
      <p>{{ `${getCha} (${getCha >= 10 ? '+' : '-'}${Math.floor((getCha - 10) * 0.5)})` }}</p>
    </div>
  </div>
  <div class="extras">
    <p><strong>Skills: </strong>{{ getSkills }}</p>
    <p><strong>Damage Vulnerabilities: </strong>{{ getVulnerabilities }}</p>
    <p><strong>Damage Resistances: </strong>{{ getResistances }}</p>
    <p><strong>Senses: </strong>{{ getSenses }}</p>
    <p><strong>Languages: </strong>{{ getLanguages }}</p>
    <p><strong>Challenge: </strong>{{ getChallenge }}</p>
    <div class="traits" v-if="getTraits.length">
      <h3>TRAITS</h3>
      <markdown v-for="trait in getTraits" :key="trait" @click="clickLink" :source="trait.descriptionWithLinks"></markdown>
    </div>
    <div class="actions" v-if="getActions.length">
      <h3>ACTIONS</h3>
      <markdown v-for="action in getActions" :key="action" :source="action.description"></markdown>
    </div>
    <div class="reactions" v-if="getReactions.length">
      <h3>REACTIONS</h3>
      <markdown v-for="reaction in getReactions" :key="reaction" :source="reaction.description"></markdown>
    </div>
    <div class="legendary" v-if="getLegendary.length">
      <h3>LEGENDARY</h3>
      <markdown v-for="legendary in getLegendary" :key="legendary" :source="legendary.description"></markdown>
    </div>
  </div>
</div>
</template>

<script>
import PowerDisplay from '@/components/PowerDisplay.vue'
import Markdown from 'vue3-markdown-it'
import * as Powers from '@/assets/powers.json'
import { VueFinalModal } from 'vue-final-modal'

const delay = async (ms) => new Promise(res => setTimeout(res, ms));

export default {
  name: 'ActorDisplay',
  components: {
    Markdown,
    VueFinalModal,
    PowerDisplay
  },
  props: ['actor'],
  data() {
    return {
      showModal: false,
      modalPower: {},
    }
  },
  methods: {
    addHP(e) {
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
    async clickLink(e) {
      await delay(100)
      let powerName = e.view.location.href.replace(/.+#/, '').replace(/%20/g, ' ')
      for (const index in Powers) {
        const power = Powers[index]
        if (String(power.name).toLowerCase() === powerName) {
          this.modalPower = power
          this.showModal = true
        }
      }
    }
  },
  computed: {
    getActorName() {
      if (this.actor) {
        return this.actor.name
      }
      return 'Actor Name'
    },
    getInitiative() {
      return 10
    },
    getArmorClass() {
      if (this.actor) {
        return this.actor.armorClass
      }
      return 10
    },
    getCurrentHealth() {
      if (this.actor) {
        return this.actor.hitPoints
      }
      return 20
    },
    getMaxHealth() {
      if (this.actor) {
        return this.actor.hitPoints
      }
      return 20
    },
    getStr() {
      if (this.actor) {
        return this.actor.strength
      }
      return 10
    },
    getDex() {
      if (this.actor) {
        return this.actor.dexterity
      }
      return 10
    },
    getCon() {
      if (this.actor) {
        return this.actor.constitution
      }
      return 10
    },
    getInt() {
      if (this.actor) {
        return this.actor.intelligence
      }
      return 10
    },
    getWis() {
      if (this.actor) {
        return this.actor.wisdom
      }
      return 10
    },
    getCha() {
      if (this.actor) {
        return this.actor.charisma
      }
      return 10
    },
    getSkills() {
      if (this.actor) {
        return this.actor.skills.join(', ')
      }
      return 'Skills'
    },
    getVulnerabilities() {
      if (this.actor) {
        return this.actor.damageVulnerabilities.join(', ')
      }
      return 'Vulns'
    },
    getResistances() {
      if (this.actor) {
        return this.actor.damageResistances.join(', ')
      }
      return 'Res'
    },
    getSenses() {
      if (this.actor) {
        return this.actor.senses.join(', ')
      }
      return 'Senses'
    },
    getLanguages() {
      if (this.actor) {
        return this.actor.languages.join(', ')
      }
      return 'Languages'
    },
    getChallenge() {
      if (this.actor) {
        `${this.actor.challengeRating} (${this.actor.experiencePoints} XP)`
      }
      return '0 (0 XP)'
    },
    getTraits() {
      if (this.actor && this.actor.behaviors.length) {
        return this.actor.behaviors.filter((element) => element.monsterBehaviorType === 'Trait')
      }
      return []
    },
    getActions() {
      if (this.actor && this.actor.behaviors.length) {
        return this.actor.behaviors.filter((element) => element.monsterBehaviorType === 'Action')
      }
      return []
    },
    getReactions() {
      if (this.actor && this.actor.behaviors.length) {
        return this.actor.behaviors.filter((element) => element.monsterBehaviorType === 'Reaction')
      }
      return []
    },
    getLegendary() {
      if (this.actor && this.actor.behaviors.length) {
        return this.actor.behaviors.filter((element) => element.monsterBehaviorType === 'Legendary')
      }
      return []
    }
  }
}
</script>

<style>
.actorName {
  min-height: 8%;
}
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