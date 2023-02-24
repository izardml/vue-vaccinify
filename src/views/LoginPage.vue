<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import GuessLayout from '@/components/GuessLayout.vue'
    import HeaderSection from '@/components/HeaderSection.vue'

    let loggedIn = ref(localStorage.getItem('loggedIn'))
    let token = ref(localStorage.getItem('token'))
    let loginFailed = ref(null)
    let society = reactive({
        id_card_number: '',
        password: '',
    })
    let route = useRoute()
    let router = useRouter()

    let message = ref('')
    let logout = ref('')

    onMounted(() => {
        if(loggedIn.value) {
            router.push({ name: 'dashboard' })
        }
    })

    function login() {
        if(society.id_card_number && society.password) {
            fetch(`http://localhost:8000/api/v1/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(society),
            }).then(res => res.json()).then(res => {
                if(res.token) {
                    localStorage.setItem('loggedIn', 'true')
                    localStorage.setItem('token', res.token)
                    loggedIn.value = true
                    router.push({ name: 'dashboard' })
                } else {
                    loginFailed.value = true
                    message.value = res.message
                }
            }).catch(err => {
                console.log(err)
                loginFailed.value = true
            })
        }
    }

    const title = ref('Vaccination Platform')
</script>

<template>
    <GuessLayout>
        <!-- S: Header -->
        <HeaderSection :title="title"></HeaderSection>
        <!-- E: Header -->

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="card card-default" @submit.prevent="login">
                        <div class="card-header">
                            <h4 class="mb-0">Login</h4>
                        </div>
                        <div class="card-body">
                            <div v-if="route.query.logout" class="alert alert-success text-center">
                                Logout success
                            </div>
                            <div v-if="message" class="alert alert-danger text-center">
                                {{ message }}
                            </div>
                            <div class="form-group row align-items-center">
                                <div class="col-4 text-right">ID Card Number</div>
                                <div class="col-8"><input type="text" class="form-control" name="id_card_number" v-model="society.id_card_number" required></div>
                            </div>
                            <div class="form-group row align-items-center">
                                <div class="col-4 text-right">Password</div>
                                <div class="col-8"><input type="password" class="form-control" name="password" v-model="society.password" required></div>
                            </div>
                            <div class="form-group row align-items-center mt-4">
                                <div class="col-4"></div>
                                <div class="col-8"><button type="submit" class="btn btn-primary">Login</button></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </GuessLayout>
</template>