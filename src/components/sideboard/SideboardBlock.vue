<template>
  <drag class="drag" :transfer-data="dragData">
    <v-tooltip right>
      <v-card ref="drag" v-bind:class="def.color" class="pa-2 ma-2 elevation-9" slot="activator">
        <div class="caption">{{def.name}}</div>
      </v-card>
      <span>{{def.clazz}}</span>
    </v-tooltip>
  </drag>
</template>

<script>
export default {
  name: 'ZSideboardBlock',
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
  props: ['def']
}
</script>

<style scoped>
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
