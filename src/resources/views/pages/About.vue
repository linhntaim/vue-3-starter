<script setup>
import {useHead} from '@unhead/vue'

useHead({
    title: 'About',
})
</script>

<template lang="pug">
.about
    h1 This is an about page
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
