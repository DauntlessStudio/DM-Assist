<template>
  <div>
    <vue-final-modal v-model="this.showMonsterList" classes="modal-container" content-class="modal-content">
      <span class="modal__title">Select Monster</span>
      <div class="modal__content scrollable">
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
        <input v-model="Name" placeholder="Player Name..." />
        <br>
        <input v-model="Initiative" placeholder="Player Initiative..." />
        <br>
        <button @click="adPlayerToInitiative(Name, Initiative)">Confirm</button>
      </div>
    </vue-final-modal>
  </div>
  <splitpanes class="default-theme dark" style="height: 100vh">
    <pane min-size="10" max-size="70" size="20">
      <div class="sidebar">1</div>
    </pane>
    <pane>
      <splitpanes horizontal class="dark">
        <pane min-size="10" size="70">
          <div class="main">
            <div class="btn-group">
              <button @click="showMonsters">Monster</button>
              <button @click="showPlayers">Player</button>
            </div>
            <div class="actors" v-if="getInitiativeOrder.length">
              <ActorDisplay @add-h-p="addHP" @remove-h-p="removeHP" class="actor" v-for="(actor, index) in getInitiativeOrder" :key="index" :actor="actor" :initiative="actor.initiative"></ActorDisplay>
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

function random(min,max) {
 return Math.floor((Math.random())*(max-min+1))+min;
}

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
      initiativeOrder: [],
    }
  },
  methods: {
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
    showMonsters() {
      this.showMonsterList = true
    },
    showPlayers() {
      this.showPlayerAdd = true
    },
    addMonsterToInitiative(monster) {
      monster['initiative'] = random(1, 20)
      monster['currentHitPoints'] = monster.hitPoints
      this.initiativeOrder.push(monster)
    },
    adPlayerToInitiative(name, initiative) {
      console.log(name, initiative)
      let player = {name: name, initiative: initiative}
      this.initiativeOrder.push(player)
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
        return a.initiative - b.initiative
      })
    },
    getMonsterOrder() {
      let tempList = Object.values(this.monsterList)
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
  width: 100%;
  height: 100%;
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