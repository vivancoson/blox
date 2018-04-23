<template>
    <drag class="drag" :transfer-data="{def}">
          <div v-bind:class="def.color" class="pa-2 ma-2 elevation-5 sideboard-block white--text">
            <div>
              <h5 v-once class="block-title">{{def.name}}</h5>
            </div>
          </div>
    </drag>
</template>

<script>

export default {
  name: 'ZSideBlock',
  props: ['def'],
  components: {}
}
</script>

<style scoped>
  .sideboard-block {
    width: 120px;
    height: 100px;
    border-radius: 5%;
  }
</style>
