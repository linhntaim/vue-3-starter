<script setup>
import {app} from '@/bootstrap/app'
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated} from 'vue'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {useHead} from '@unhead/vue'
import TheWelcome from '../components/TheWelcome.vue'

onBeforeRouteUpdate(() => {
    app.$log.debug('page', 'home.beforeRouteUpdate')
})
onBeforeRouteLeave(() => {
    app.$log.debug('page', 'home.beforeRouteLeave')
})
onBeforeMount(() => {
    app.$log.debug('page', 'home.onBeforeMount')
})
onMounted(() => {
    app.$log.debug('page', 'home.onMounted')
})
onBeforeUpdate(() => {
    app.$log.debug('page', 'home.onBeforeUpdate')
})
onUpdated(() => {
    app.$log.debug('page', 'home.onUpdated')
})
onBeforeUnmount(() => {
    app.$log.debug('page', 'home.onBeforeUnmount')
})
onUnmounted(() => {
    app.$log.debug('page', 'home.onUnmounted')
})

useHead({
    title: 'Home',
})
</script>

<template lang="pug">
.home
    the-welcome
</template>
