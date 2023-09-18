<script setup>
import {app} from '@/bootstrap/app'
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated} from 'vue'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {useHead} from '@unhead/vue'

onBeforeRouteUpdate(() => {
    app.$log.debug('page', 'not-found.beforeRouteUpdate')
})
onBeforeRouteLeave(() => {
    app.$log.debug('page', 'not-found.beforeRouteLeave')
})
onBeforeMount(() => {
    app.$log.debug('page', 'not-found.onBeforeMount')
})
onMounted(() => {
    app.$log.debug('page', 'not-found.onMounted')
})
onBeforeUpdate(() => {
    app.$log.debug('page', 'not-found.onBeforeUpdate')
})
onUpdated(() => {
    app.$log.debug('page', 'not-found.onUpdated')
})
onBeforeUnmount(() => {
    app.$log.debug('page', 'not-found.onBeforeUnmount')
})
onUnmounted(() => {
    app.$log.debug('page', 'not-found.onUnmounted')
})

useHead({
    title: '404 - Not found',
})
</script>

<template lang="pug">
.center-aligned-page.not-found
    h1 404 - Not found
</template>
