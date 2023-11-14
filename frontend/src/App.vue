<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

const timesheets = ref()

onMounted(async () => {
  const body = await fetch('http://localhost:8080/timesheets')
  const data = await body.json()
  console.log(data)
  timesheets.value = data
})

</script>

<template>
  <div>
    <div v-for="timesheet in timesheets" :key="timesheet._id">
      <RouterLink :to="'/timesheet/' + timesheet._id">{{ timesheet.name }}</RouterLink>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
</style>
