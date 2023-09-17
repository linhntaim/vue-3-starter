<script setup>
import {useHead} from '@unhead/vue'
import TheWelcome from '../components/TheWelcome.vue'

useHead({
    title: 'Home',
})
</script>

<template lang="pug">
main
    the-welcome
</template>
