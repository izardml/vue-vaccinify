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

    const title = ref('')

    fetch(`http://localhost:8000/api/v1/vaccinations?token=${token.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(res => {
        if(res.vaccinations.first == null && res.vaccinations.second == null) {
            title.value = 'First Vaccination'
        }else{
            title.value = 'Second Vaccination'
        }
    }).catch(err => console.log(err))

    let society = reactive({
        regional: []
    })

    fetch(`http://localhost:8000/api/user?token=${token.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(res => {
        society.regional = res.regional
    }).catch(err => console.log(err))

    let spots = ref([])

    onMounted(() => {
        fetch(`http://localhost:8000/api/v1/spots?token=${token.value}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json()).then(res => {
            console.log(res)

            spots.value = res.spots
        }).catch(err => console.log(err))
    })
</script>

<template>
    <AppLayout>
        <!-- S: Header -->
        <HeaderSection :title="title"></HeaderSection>
        <!-- E: Header -->

        <div class="container mb-5">

            <div class="section-header mb-4">
                <h4 class="section-title text-muted font-weight-normal">List Vaccination Spots in {{ society.regional.district }}</h4>
            </div>

            <div class="section-body">

                <article v-for="(spot, index) in spots" :key="index" class="spot">
                    <router-link :to="{ name: 'reg_vaccination', params: {id: spot.id} }" class="row">
                        <div class="col-5">
                            <h5 class="text-primary">{{ spot.name }}</h5>
                            <span class="text-muted">{{ spot.address }}</span>
                        </div>
                        <div class="col-4">
                            <h5>Available vaccines</h5>
                            <!-- <span class="text-muted">Sinovac, Moderna, Pfizer.</span> -->
                            <span class="text-muted" v-if="spot.available_vaccines.Sinovac == true">Sinovac, </span>
                            <span class="text-muted" v-if="spot.available_vaccines.AstraZeneca == true">AstraZeneca, </span>
                            <span class="text-muted" v-if="spot.available_vaccines.Moderna == true">Moderna, </span>
                            <span class="text-muted" v-if="spot.available_vaccines.Pfizer == true">Pfizer, </span>
                            <span class="text-muted" v-if="spot.available_vaccines.Sinnopharm == true">Sinnopharm, </span>
                        </div>
                        <div class="col-3">
                            <h5>Serve</h5>
                            <span class="text-muted">
                            Only first vaccination
                        </span>
                        </div>
                    </router-link>
                </article>

            </div>

        </div>
    </AppLayout>
</template>