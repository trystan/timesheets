<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps(['id'])

const timesheet = ref()

onMounted(async () => {
  console.log(props)
  const body = await fetch('http://localhost:8080/timesheets/' + props.id)
  const data = await body.json()
  console.log(data)
  timesheet.value = data
})

const addItem = () => {
  timesheet.value.items.push({ date: new Date().toISOString(), numberOfMinutes: 0 })
}
</script>

<template>
  <div v-if="timesheet">
    <h1>{{ timesheet.name }}</h1>
    <div><textarea v-model="timesheet.description"></textarea></div>

    <div v-for="item in timesheet.items" :key="item.date">
      <input type='text' v-model="item.date" />
      <input type='text' v-model="item.numberOfMinutes" />
    </div>
    <button @click="addItem" >+</button>

    <div>Rate <input type='text' v-model="timesheet.rate" style="width: 80px" /></div>
    <div>Total Time {{ timesheet.totalTime }}</div>
    <div>Total Cost {{ timesheet.totalCost }}</div>
  </div>
  
  <div v-if="!timesheet">
    Loading...
  </div>
</template>

<style>
</style>
