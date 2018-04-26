<template>
    <drag class="drag"  :transfer-data="dragData">
          <div ref="drag" v-bind:class="def.color" class="pa-2 ma-2 elevation-5 sideboard-block white--text">
            <div>
              <h5 v-once class="block-title">{{def.name}}</h5>
            </div>
          </div>
    </drag>
</template>

<script>

export default {
  name: 'ZSideBlock',
  data () {
    const el = () => {
      return this.$refs.drag
    }
    return {
      dragData: {
        def: this.def,
        el
      }
    }
  },
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
  .block-input{
    background-color: #42928c;
  }
  .block-middleware{
    background-color: #b54a48;
  }
  .block-output{
    background-color: #80495e;
  }
</style>
