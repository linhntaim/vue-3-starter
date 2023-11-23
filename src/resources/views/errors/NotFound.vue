<script setup>
import {useApp} from '@/starter/app'
import {usePageTitle} from '@/starter/page-title'
import {useHead} from '@unhead/vue'
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated} from 'vue'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'

const app = useApp()
const pageTitle = usePageTitle('404 - Not found')

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
    title: () => pageTitle.toString(),
})
</script>

<template lang="pug">
.center-aligned-page.not-found
    h1 404 - Not found
</template>
