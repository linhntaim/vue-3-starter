<script setup>
import {useApp} from '@/starter/app'
import {usePageTitle} from '@/starter/page-title'
import {useDarkMode} from '@/starter/settings'
import {useHead} from '@unhead/vue'
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref, watch} from 'vue'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'

const app = useApp()
const pageTitle = usePageTitle('About')

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
    title: () => pageTitle.toString(),
})

const world = ref('World')
const locale = ref(app.$getLocale())
const locales = app.$config.settings.locale.supported

watch(locale, () => app.$setLocale(locale.value))

const {value: darkMode, toggle: toggleDarkMode} = useDarkMode()
</script>

<template lang="pug">
.center-aligned-page.about
    h1 This is an about page
    p.row.row-cols-sm-auto.g-3.align-items-center.justify-content-center.justify-content-lg-start.row-cols-auto
        .col-12
            small Say hello to&nbsp;
        .col-12
            input.form-control(v-model="world" type="text")
        template(v-if="locales.length > 1")
            .col-12
                small &nbsp;in&nbsp;
            .col-12
                select.form-select(v-model="locale")
                    option(v-for="value in locales" :key="value" :value="value")
                        | {{ value }}
    p {{ $t('hello', {world: world}) }}
    p
        button.btn.btn-primary(@click="toggleDarkMode") Dark mode: {{ darkMode ? 'ON' : 'OFF' }}
</template>
