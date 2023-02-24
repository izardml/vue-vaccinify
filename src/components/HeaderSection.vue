<script setup>
    const props = defineProps({
        title: String
    })
</script>

<template>
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">{{ title }}</h1>
        </div>
    </header>
</template>