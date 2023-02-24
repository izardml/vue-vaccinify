<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import AppLayout from '../components/AppLayout.vue'
    import HeaderSection from '../components/HeaderSection.vue'

    let loggedIn = ref(localStorage.getItem('loggedIn'))
    let token = ref(localStorage.getItem('token'))
    let router = useRouter()
    let route = useRoute()

    onMounted(() => {
        if(!loggedIn.value) {
            router.push({ name: 'login' })
        }
    })

    let spot = ref([])

    fetch(`http://localhost:8000/api/v1/spots/${route.params.id}/?token=${token.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(res => {
        console.log(res)
        
        spot.value = res.spot
    }).catch(err => console.log(err))

    const title = ref('')
</script>

<template>
    <AppLayout>
        <HeaderSection :title="title"></HeaderSection>
    </AppLayout>
</template>