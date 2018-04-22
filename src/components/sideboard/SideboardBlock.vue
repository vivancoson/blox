<template>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">{{definition.name}}</span>
      <p>I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ZSideBlock',
  props: ['def'],
  inject: ['blocService'],
  asyncComputed: {
    definition: {
      get () {
        return {
          name: 'SecuredKafkaInput',
          definition: this.blocService.getDefinitions()['SecuredKafkaInput']
        }
      },
      default: {name: 'Loading'}
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
