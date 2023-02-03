<template>
<div style="position: relative;">
  <div>
    <vue-final-modal v-model="this.showModal" classes="modal-container" content-class="modal-content">
      <power-display :power="this.modalPower"></power-display>
    </vue-final-modal>
  </div>
  <button @click="toggleMinimized" v-if="!this.minimized" class="visibility"><font-awesome-icon icon="fa-solid fa-eye-slash" /></button>
  <button @click="toggleMinimized" v-if="this.minimized" class="visibility"><font-awesome-icon icon="fa-solid fa-eye" /></button>
  <h1 v-if="getActorName" class="actorName">{{ getActorName }}</h1>
  <div v-if="getInitiative" class="initiative">
    <p><strong>Initiative: </strong> {{ getInitiative }}</p>
  </div>
  <div v-if="!this.minimized">
    <div v-if="getArmorClass" class="armor">
      <p><strong>Armor Class: </strong> {{ getArmorClass }}</p>
    </div>
    <div v-if="getMaxHealth" class="hp">
      <button @click="removeHP">-</button>
      <div class="shell">
        <span>{{ `${getCurrentHealth}/${getMaxHealth}` }}</span>
        <div class="bar" :style="{ width: (getCurrentHealth / getMaxHealth * 100) + '%' }">
        </div>
      </div>
      <button @click="addHP">+</button>
    </div>
    <div class="stats">
      <div v-if="getStr" class="strength">
        <strong>STR</strong>
        <p>{{ `${getStr} (${getStr >= 10 ? '+' : ''}${Math.floor((getStr - 10) * 0.5)})` }}</p>
      </div>
      <div v-if="getDex" class="dexterity">
        <strong>DEX</strong>
        <p>{{ `${getDex} (${getDex >= 10 ? '+' : ''}${Math.floor((getDex - 10) * 0.5)})` }}</p>
      </div>
      <div v-if="getCon" class="constitution">
        <strong>CON</strong>
        <p>{{ `${getCon} (${getCon >= 10 ? '+' : ''}${Math.floor((getCon - 10) * 0.5)})` }}</p>
      </div>
      <div v-if="getInt" class="intelligence">
        <strong>INT</strong>
        <p>{{ `${getInt} (${getInt >= 10 ? '+' : ''}${Math.floor((getInt - 10) * 0.5)})` }}</p>
      </div>
      <div v-if="getWis" class="wisdom">
        <strong>WIS</strong>
        <p>{{ `${getWis} (${getWis >= 10 ? '+' : ''}${Math.floor((getWis - 10) * 0.5)})` }}</p>
      </div>
      <div v-if="getCha" class="charisma">
        <strong>CHA</strong>
        <p>{{ `${getCha} (${getCha >= 10 ? '+' : ''}${Math.floor((getCha - 10) * 0.5)})` }}</p>
      </div>
    </div>
    <div class="extras">
      <p v-if="getSkills"><strong>Skills: </strong>{{ getSkills }}</p>
      <p v-if="getVulnerabilities"><strong>Damage Vulnerabilities: </strong>{{ getVulnerabilities }}</p>
      <p v-if="getResistances"><strong>Damage Resistances: </strong>{{ getResistances }}</p>
      <p v-if="getSenses"><strong>Senses: </strong>{{ getSenses }}</p>
      <p v-if="getLanguages"><strong>Languages: </strong>{{ getLanguages }}</p>
      <p v-if="getChallenge"><strong>Challenge: </strong>{{ getChallenge }}</p>
      <div class="traits" v-if="getTraits.length">
        <h3>TRAITS</h3>
        <markdown v-for="trait in getTraits" :key="trait" @click="clickLink" :source="trait.descriptionWithLinks">
        </markdown>
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
  props: ['actor', 'initiative'],
  emits: ['addHP', 'removeHP'],
  data() {
    return {
      showModal: false,
      modalPower: {},
      currentHealth: 0,
      minimized: true,
    }
  },
  mounted() {
    this.currentHealth = this.getMaxHealth
  },
  methods: {
    addHP(e) {
      this.$emit('addHP', this.actor, e.ctrlKey ? 5 : 1)
    },
    removeHP(e) {
      this.$emit('removeHP', this.actor, e.ctrlKey ? 5 : 1)
    },
    toggleMinimized() {
      this.minimized = !this.minimized
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
      if (this.actor && this.actor.name) {
        return this.actor.name
      }
      return 'Actor Name'
    },
    getInitiative() {
      if (this.actor && this.actor.initiative) {
        return this.actor.initiative
      }
      return 1
    },
    getArmorClass() {
      if (this.actor && this.actor.armorClass) {
        return this.actor.armorClass
      }
      return undefined
    },
    getCurrentHealth() {
      if (this.actor && this.actor.currentHitPoints !== undefined) {
        return this.actor.currentHitPoints
      }
      return undefined
    },
    getMaxHealth() {
      if (this.actor && this.actor.hitPoints) {
        return this.actor.hitPoints
      }
      return undefined
    },
    getStr() {
      if (this.actor && this.actor.strength) {
        return this.actor.strength
      }
      return undefined
    },
    getDex() {
      if (this.actor && this.actor.dexterity) {
        return this.actor.dexterity
      }
      return undefined
    },
    getCon() {
      if (this.actor && this.actor.constitution) {
        return this.actor.constitution
      }
      return undefined
    },
    getInt() {
      if (this.actor && this.actor.intelligence) {
        return this.actor.intelligence
      }
      return undefined
    },
    getWis() {
      if (this.actor && this.actor.wisdom) {
        return this.actor.wisdom
      }
      return undefined
    },
    getCha() {
      if (this.actor && this.actor.charisma) {
        return this.actor.charisma
      }
      return undefined
    },
    getSkills() {
      if (this.actor && this.actor.skills) {
        return this.actor.skills.join(', ')
      }
      return undefined
    },
    getVulnerabilities() {
      if (this.actor && this.actor.damageVulnerabilities) {
        return this.actor.damageVulnerabilities.join(', ')
      }
      return undefined
    },
    getResistances() {
      if (this.actor && this.actor.damageResistances) {
        return this.actor.damageResistances.join(', ')
      }
      return undefined
    },
    getSenses() {
      if (this.actor && this.actor.senses) {
        return this.actor.senses.join(', ')
      }
      return undefined
    },
    getLanguages() {
      if (this.actor && this.actor.languages) {
        return this.actor.languages.join(', ')
      }
      return undefined
    },
    getChallenge() {
      if (this.actor && this.actor.challengeRating !== undefined && this.actor.experiencePoints !== undefined) {
        return `${this.actor.challengeRating} (${this.actor.experiencePoints} XP)`
      }
      return undefined
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
.visibility {
  position: absolute;
  background: transparent;
  border-style: none;
  color: gray;
  right: 20px;
  top: 25px;
  font-size: 2em;
}
.visibility:hover {
  color: white;
}
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
.extras p {
  display: inline;
  margin-right: 5px;
  padding-right: 5px;
  border-right: 3px solid gray;
}
.extras p:last-of-type {
  border-right: none;
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

@media only screen and (max-width: 992px) {
  h1 {
    font-size: 1.2em;
  }
  p {
    font-size: 0.75em;
  }
  .visibility {
    right: 0px;
    top: -5px;
    font-size: 1.2em;
  }
}
</style>