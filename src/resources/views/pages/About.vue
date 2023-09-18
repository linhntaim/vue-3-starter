<script setup>
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref, watch} from 'vue'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {useApp} from '@/bootstrap/use-app'
import {useHead} from '@unhead/vue'

const app = useApp()

onBeforeRouteUpdate(() => {
    app.$log.debug('page', 'about.beforeRouteUpdate')
})
onBeforeRouteLeave(() => {
    app.$log.debug('page', 'about.beforeRouteLeave')
})
onBeforeMount(() => {
    app.$log.debug('page', 'about.onBeforeMount')
})
onMounted(() => {
    app.$log.debug('page', 'about.onMounted')
})
onBeforeUpdate(() => {
    app.$log.debug('page', 'about.onBeforeUpdate')
})
onUpdated(() => {
    app.$log.debug('page', 'about.onUpdated')
})
onBeforeUnmount(() => {
    app.$log.debug('page', 'about.onBeforeUnmount')
})
onUnmounted(() => {
    app.$log.debug('page', 'about.onUnmounted')
})

useHead({
    title: 'About',
})

const world = ref('World')
const locale = ref(app.$i18n.locale)
const locales = app.$config.localization.locale.supported

watch(locale, () => app.$setLocale(locale.value))
</script>

<template lang="pug">
.center-aligned-page.about
    h1 This is an about page
    p
        small Say hello to&nbsp;
        input(v-model="world" type="text")
        template(v-if="locales.length > 1")
            small &nbsp;in&nbsp;
            select(v-model="locale")
                option(v-for="value in locales" :key="value" :value="value")
                    | {{ value }}
    p {{ $t('hello', {world: world}) }}
</template>
