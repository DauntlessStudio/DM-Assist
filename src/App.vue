<template>
  <div>
    <vue-final-modal v-model="this.showMonsterList" classes="modal-container" content-class="modal-content">
      <span class="modal__title">Select Monster</span>
      <div class="modal__content scrollable">
        <input ref="monsterSearch" v-model="this.monsterSearch" placeholder="Monster Name..." />
        <table>
          <tr>
            <th><button @click="setMonsterSort('name')">Name</button></th>
            <th><button @click="setMonsterSort('size')">Size</button></th>
            <th><button @click="setMonsterSort('type')">Type</button></th>
            <th><button @click="setMonsterSort('cr')">CR</button></th>
            <th><button @click="setMonsterSort('alignment')">Alignment</button></th>
          </tr>
          <tr class="monster" v-for="monster in getMonsterOrder" :key="monster" @click="addMonsterToInitiative(monster)">
            <td>{{ monster.name }}</td>
            <td>{{ monster.size }}</td>
            <td>{{ String(monster.types).replace(/\[\]\"/g, '') }}</td>
            <td>{{ monster.challengeRating }}</td>
            <td>{{ monster.alignment }}</td>
          </tr>
        </table>
      </div>
    </vue-final-modal>
    <vue-final-modal v-model="this.showPlayerAdd" classes="modal-container" content-class="modal-content">
      <span class="modal__title">Add Player</span>
      <div class="modal__content player-input">
        <input ref="nameField" v-model="this.playerName" placeholder="Player Name..." />
        <br>
        <input ref="initiativeField" v-model="this.playerInitiative" placeholder="Player Initiative..." />
        <br>
        <button @click="addPlayerToInitiative">Confirm</button>
      </div>
    </vue-final-modal>
  </div>
  <splitpanes class="default-theme dark" style="height: 100vh">
    <pane min-size="10" max-size="70" size="17">
      <div class="sidebar">
        <button @click="{this.diceVal += this.random(1, 20); this.d20Count += 1;}" class="dice d20"><img src="@/assets/d20.png" alt="d20"><p class="dice" v-show="this.d20Count">{{ `x${this.d20Count}` }}</p></button>
        <button @click="{this.diceVal += this.random(1, 12); this.d12Count += 1;}" class="dice d12"><img src="@/assets/d12.png" alt="d12"><p class="dice" v-show="this.d12Count">{{ `x${this.d12Count}` }}</p></button>
        <button @click="{this.diceVal += this.random(1, 10); this.d10Count += 1;}" class="dice d10"><img src="@/assets/d10.png" alt="d10"><p class="dice" v-show="this.d10Count">{{ `x${this.d10Count}` }}</p></button>
        <button @click="{this.diceVal += this.random(1, 8); this.d8Count += 1;}" class="dice d8"><img src="@/assets/d8.png" alt="d8"><p class="dice" v-show="this.d8Count">{{ `x${this.d8Count}` }}</p></button>
        <button @click="{this.diceVal += this.random(1, 6); this.d6Count += 1;}" class="dice d6"><img src="@/assets/d6.png" alt="d6"><p class="dice" v-show="this.d6Count">{{ `x${this.d6Count}` }}</p></button>
        <button @click="{this.diceVal += this.random(1, 4); this.d4Count += 1;}" class="dice d4"><img src="@/assets/d4.png" alt="d4"><p class="dice" v-show="this.d4Count">{{ `x${this.d4Count}` }}</p></button>
        <button @click="resetDice" v-show="this.diceVal" class="dice-val">{{ this.diceVal }}</button>
      </div>
    </pane>
    <pane>
      <splitpanes horizontal class="dark">
        <pane min-size="10" size="70">
          <div class="main">
            <div class="btn-group">
              <button @click="showMonsters">Monster</button>
              <button @click="showPlayers">Player</button>
              <button @click="clearInitiativeOrder">Clear All</button>
            </div>
            <div class="actors" v-if="getInitiativeOrder.length">
              <ActorDisplay @add-h-p="addHP" @remove-h-p="removeHP" @delete="deleteActor" @change-name="renameActor" class="actor" v-for="(actor, index) in getInitiativeOrder" :key="index" :actor="actor" :initiative="actor.initiative"></ActorDisplay>
            </div>
          </div>
        </pane>
        <pane min-size="10" size="30">
          <div class="notes">
            <div class="btn-group">
              <button>Save</button>
              <button>Open</button>
            </div>
            <textarea name="notes" id="notes" cols="30" rows="10"></textarea>
          </div>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import { VueFinalModal } from 'vue-final-modal'
import ActorDisplay from '@/components/ActorDisplay.vue'
import * as Monsters from '@/assets/monsters.json'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'App',
  components: { Splitpanes, Pane, VueFinalModal, ActorDisplay },
  data() {
    return {
      showMonsterList: false,
      showPlayerAdd: false,
      monsterList: Monsters,
      monsterSort: "name",
      monsterInverse: false,
      monsterSearch: '',
      initiativeOrder: [],
      diceVal: 0,
      d20Count: 0,
      d12Count: 0,
      d10Count: 0,
      d8Count: 0,
      d6Count: 0,
      d4Count: 0,
      playerName: '',
      playerInitiative: ''
    }
  },
  methods: {
    random(min,max) {
     return Math.floor((Math.random())*(max-min+1))+min;
    },
    resetDice() {
      this.diceVal = 0
      this.d20Count = 0
      this.d12Count = 0
      this.d10Count = 0
      this.d8Count = 0
      this.d6Count = 0
      this.d4Count = 0
    },
    addHP(monster, amount) {
      if(monster.currentHitPoints < monster.hitPoints) {
        monster.currentHitPoints += amount
        monster.currentHitPoints = Math.min(monster.currentHitPoints, monster.hitPoints)
      }
    },
    removeHP(monster, amount) {
      if(monster.currentHitPoints > 0) {
        monster.currentHitPoints -= amount
        monster.currentHitPoints = Math.max(monster.currentHitPoints, 0)
      }
    },
    clearInitiativeOrder() {
      this.initiativeOrder = []
    },
    deleteActor(actor) {
      let index = this.initiativeOrder.indexOf(actor)
      if (index > -1) {
        this.initiativeOrder.splice(index, 1)
      }
    },
    renameActor(actor, name) {
      actor.name = name
    },
    showMonsters() {
      this.showMonsterList = true
    },
    showPlayers() {
      this.showPlayerAdd = true
    },
    addMonsterToInitiative(monster) {
      let newMonster = JSON.parse(JSON.stringify(monster))
      newMonster['initiative'] = this.random(1, 20)
      newMonster['currentHitPoints'] = newMonster.hitPoints
      this.initiativeOrder.push(newMonster)
    },
    addPlayerToInitiative() {
      let player = {name: this.playerName, initiative: this.playerInitiative}
      this.initiativeOrder.push(player)
      this.playerName = ''
      this.playerInitiative = ''
      this.$refs.nameField.value = ''
      this.$refs.initiativeField.value = ''
    },
    setMonsterSort(sortVal) {
      if (this.monsterSort === sortVal) {
        this.monsterInverse = !this.monsterInverse
      }else {
        this.monsterInverse = false
      }
      this.monsterSort = sortVal
    }
  },
  computed: {
    getInitiativeOrder() {
      let tempList = this.initiativeOrder
      return tempList.sort(function (a, b) {
        return b.initiative - a.initiative
      })
    },
    getMonsterOrder() {
      let tempList = Object.values(this.monsterList).filter((element) => element.name !== undefined)
      if (this.monsterSearch !== '') {
        tempList = tempList.filter((monster) => monster.name.toLowerCase().includes(this.monsterSearch.toLowerCase()))
      }
      var sorter = this.monsterSort
      var inverse = this.monsterInverse
      return tempList.sort(function (a, b) {
        let comparison = 0
        if (a.name && b.name) {
          switch (sorter) {
          case 'size':
            comparison = a.sizeEnum - b.sizeEnum
            break
          case 'type':
            comparison = String(a.types).localeCompare(String(b.types))
            break
          case 'cr':
            comparison = eval(a.challengeRating) - eval(b.challengeRating)
            break
          case 'alignment':
            comparison = a.alignment.localeCompare(b.alignment)
            break
          default:
            comparison = a.name.localeCompare(b.name)
            break;
        }
        }
        if (inverse) {
          comparison *= -1
        }
        return comparison
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
html, body {
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  width: 100vw;
}
.splitpanes.default-theme.dark .splitpanes__splitter::before {
  display: none;
}
.splitpanes.default-theme.dark .splitpanes__splitter:after {
  display: none;
}
.splitpanes.default-theme.dark .splitpanes__splitter {
    background-color: #424e5a;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
}
.default-theme.dark.splitpanes--horizontal>.splitpanes__splitter, .default-theme.dark .splitpanes--horizontal>.splitpanes__splitter {
    height: 1px;
    border-top: 2px solid #424e5a;
    margin-top: -1px;
}
.default-theme.dark.splitpanes--vertical>.splitpanes__splitter, .default-theme.dark .splitpanes--vertical>.splitpanes__splitter {
    width: 1px;
    border-left: 2px solid #424e5a;
    margin-left: -1px;
}
.default-theme.dark.splitpanes--horizontal>.splitpanes__splitter:hover, .default-theme.dark .splitpanes--horizontal>.splitpanes__splitter:hover {
    height: 1px;
    border-top: 7px solid #445566;
    margin-top: -1px;
    transition: border-width 0.2s;
}
.default-theme.dark.splitpanes--vertical>.splitpanes__splitter:hover, .default-theme.dark .splitpanes--vertical>.splitpanes__splitter:hover {
    width: 1px;
    border-left: 7px solid #445566;
    margin-left: -1px;
    transition: border-width 0.2s;
}
.dark.splitpanes--vertical>.splitpanes__splitter {
    min-width: 1px;
    cursor: ew-resize
}
.dark.splitpanes--horizontal>.splitpanes__splitter {
    min-height: 1px;
    cursor: ns-resize
}
.splitpanes__pane {
  margin: 0;
  padding: 0;
}
.sidebar {
  margin: 0;
  padding: 0;
  min-width: 100%;
  min-height: 100%;
  overflow-y: auto;
  background-color: #2c3e50;
}
.main {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}
.notes {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}
.btn-group {
  display: inline-block;
  width: 100%;
}
.btn-group button, tr button {
  background-color: inherit;
  border-style: none;
  color: gray;
  padding: 10px 24px;
  cursor: pointer;
  float: left;
}
.btn-group button:hover, tr button:hover {
  color: white;
}
button {
  background-color: inherit;
  border-style: none;
  color: gray;
  padding: 10px 24px;
  cursor: pointer;
  float: left;
}
button:hover {
  color: white;
}
.dice-val {
  float: none;
  font-size: 3em;
  font-weight: bold;
}
p.dice {
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 2em;
  font-weight: bold;
}
.dice {
  position: relative;
  width: fit-content;
  margin: 0;
  padding: 0;
}
.dice img {
  max-width: 120px;
  max-height: 120px;
  filter: brightness(0.5)
}
.dice img:hover {
  filter: brightness(1)
}
@media only screen and (max-width: 992px) {
  .dice img {
    max-width: 64px;
    max-height: 64px;
  }
  p.dice {
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 1em;
    font-weight: bold;
  }
  .dice-val {
    float: none;
    font-size: 2em;
    text-align: center;
    padding-left: 0;
    padding-right: 0;
  }
  .scrollable {
    max-width: 80vw;
    max-height: 70vh;
    font-size: 0.75em;
  }
}
.player-input button {
  float: none;
}
input {
  background: transparent;
  color: white;
  margin: 10px;
  border: 2px solid gray;
}
input:focus {
  outline: none;
  border: 2px solid white;
  transition: border 0.2s;
}
input::placeholder {
  color: gray;
}
textarea {
  resize: none;
  margin: 0;
  padding: 5px;
  width: 100%;
  height: 100%;
  border-style: none;
  background-color: #2e4155;
  color: white;
}
textarea:focus {
  outline: none;
}
td, th {
  border-bottom: 1px solid gray;
  text-align: left;
  padding: 8px;
  padding-bottom: 12px;
}
.monster:hover {
  background-color: #445566;
}

.actors {
  min-height: fit-content;
  max-height: 90%;
  overflow-y: auto;
  overflow-x: auto;
}

.actors > .actor {
  border-bottom: 2px solid gray;
  padding: 10px;
}
</style>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>