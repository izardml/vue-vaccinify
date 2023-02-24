<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import FooterSection from './FooterSection.vue'

    let token = ref(localStorage.getItem('token'))
    let society = reactive({
        name: ''
    })
    let router = useRouter()

    onMounted(() => {
        fetch(`http://localhost:8000/api/user?token=${token.value}`).then(res => res.json()).then(res => {
            society.name = res.name
        }).catch(err => console.log(err))
    })

    function navbar() {
        let navbar = document.getElementById('navbarsExampleDefault')

        navbar.classList.toggle('collapse')
        navbar.classList.toggle('navbar-collapse')
    }

    function logout() {
        fetch(`http://localhost:8000/api/v1/auth/logout?token=${token.value}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json()).then(res => {
            localStorage.removeItem('loggedIn')
            localStorage.removeItem('token')
            router.push({ name: 'logout' })
        }).catch(err => console.log(err))
    }
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'dashboard' }">Vaccination Platform</router-link>
            <button @click.prevent="navbar" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'dashboard' }">{{ society.name }}</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)" @click.prevent="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main>
        <slot/>
    </main>

    <FooterSection></FooterSection>
</template>