<template>
  <v-dialog v-model="state.formState" max-width="290">
    <v-card class="white">
      <v-card-title class="headline">Use Google's location service?</v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click.native="state.formState = false">Disagree</v-btn>
        <v-btn color="green darken-1" flat="flat" @click.native="state.formState = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ZModalForm',
  inject: ['stateService'],
  data () {
    return {
      state: this.stateService.state,
      tiles: [
        {img: 'keep.png', title: 'Keep'},
        {img: 'inbox.png', title: 'Inbox'},
        {img: 'hangouts.png', title: 'Hangouts'},
        {img: 'messenger.png', title: 'Messenger'},
        {img: 'google.png', title: 'Google+'}
      ]
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
