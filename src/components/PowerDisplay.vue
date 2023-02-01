<template>
    <span class="modal__title">{{ getName }}</span>
      <div class="modal__content">
        <p><strong>Level: </strong>{{ getLevel }}</p>
        <p><strong>Casting Period: </strong>{{ getCastingPeriod }}</p>
        <p><strong>Range: </strong>{{ getRange }}</p>
        <p><strong>Duration: </strong>{{ getDuration }}</p>
        <p><strong>Concentration: </strong>{{ getConcentration }}</p>
        <markdown :source="getDescription"></markdown>
      </div>
</template>

<script>
import Markdown from 'vue3-markdown-it'

export default{
    name: 'PowerDisplay',
    components: {
      Markdown,
    },
    props: ['power'],
    computed: {
        getName() {
            return this.power.name ?? 'Power'
        },
        getLevel() {
            return this.power.level ?? 0
        },
        getCastingPeriod() {
            return this.power.castingPeriod ?? 'Action'
        },
        getRange() {
            return this.power.range ?? 'Touch'
        },
        getDuration() {
            return this.power.duration ?? 'Instantaneous'
        },
        getConcentration() {
            return this.power.concentration ?? false
        },
        getDescription() {
            return this.power.description ?? 'Lorum Ipsum'
        }
    },
    mounted() {
        console.log(this.power)
    }
}
</script>

<style>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  background: #1d2d3d;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>