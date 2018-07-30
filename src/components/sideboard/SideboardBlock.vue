<template>
  <drag
    :transfer-data="dragData"
    class="drag">
    <v-tooltip right>
      <v-card
        ref="drag"
        slot="activator"
        :class="def.color"
        class="pa-2 ma-2 elevation-9">
        <div class="caption">{{ def.name }}</div>
      </v-card>
      <span>{{ def.description || def.clazz }}</span>
    </v-tooltip>
  </drag>
</template>

<script>
export default {
  name: 'ZSideboardBlock',
  props: {
    def: {
      type: Object,
      default() {
        return {
          name: 'Empty Element',
          description: "you're not supposed to see this block, it's a default block who's empty, DON'T USE IT",
          color: '',
        };
      },
    },
  },
  data() {
    const el = () => this.$refs.drag;
    return {
      dragData: {
        def: this.def,
        el,
      },
    };
  },
};
</script>

<style scoped>
.block-input {
  background-color: #42928c;
}
.block-middleware {
  background-color: #b54a48;
}
.block-output {
  background-color: #80495e;
}
</style>
