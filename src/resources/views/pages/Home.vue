<script setup>
import {useApp} from '@/starter/app'
import {usePageTitle} from '@/starter/page-title'
import {useHead} from '@unhead/vue'
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated} from 'vue'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'

const app = useApp()
const pageTitle = usePageTitle('Home')

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
    title: () => pageTitle.toString(),
})
</script>

<template lang="pug">
.home
    the-welcome
</template>
