<script setup>
import {getCurrentInstance} from 'vue'
import {useHead} from '@unhead/vue'

const app = getCurrentInstance().proxy

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
