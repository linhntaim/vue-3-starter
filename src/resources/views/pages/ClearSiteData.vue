<script setup>
import {computed, nextTick, reactive} from 'vue'
import {useHead} from '@unhead/vue'

useHead({
    title: 'Clear Site Data',
})

const logs = reactive([])
const lines = computed(() => logs.join('\n'))

function onClearClick() {
    logs.splice(0)
    nextTick(() => {
        clearSessionStorage()
        clearLocalStorage()
        clearCookies()
    })
}

function clearSessionStorage() {
    logs.push('Clearing session storage ...')
    window.sessionStorage.clear()
    logs.push('Session storage was cleared.')
}

function clearLocalStorage() {
    logs.push('Clearing local storage ...')
    window.localStorage.clear()
    logs.push('Local storage was cleared.')
}

function clearCookies() {
    logs.push('Clearing cookies ...')
    document.cookie.split(';').forEach(function (cookie) {
        document.cookie = cookie.replace(/^ +/, '')
            .replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/')
    })
    logs.push('Cookies were cleared.')
}
</script>

<template lang="pug">
h1 Clear site data
p Including session storage, local storage and cookies.
button(type="button" @click="onClearClick") Clear
pre(v-if="logs.length > 0")
    code {{ lines }}
</template>
