<script setup>
import {useApp} from '@/bootstrap/use-app'
import {useHead} from '@unhead/vue'

const app = useApp()

useHead({
    templateParams: {
        site: {
            name: app.$config.app.name,
            url: app.$config.app.url,
        },
        separator: '-',
    },
    titleTemplate: '%s %separator %site.name',
})
</script>

<template lang="pug">
router-view
</template>
