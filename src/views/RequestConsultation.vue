<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import AppLayout from '@/components/AppLayout.vue'
    import HeaderSection from '@/components/HeaderSection.vue'

    let loggedIn = ref(localStorage.getItem('loggedIn'))
    let token = ref(localStorage.getItem('token'))
    let router = useRouter()

    onMounted(() => {
        if(!loggedIn.value) {
            router.push({ name: 'login' })
        }
    })

    let disease_history = ref('yes')
    let current_symptoms = ref('yes')

    const title = ref('Request Consultation')

    let consultation = reactive({
        disease_history: '',
        current_symptoms: '',
    })

    function store() {
        fetch(`http://localhost:8000/api/v1/consultations?token=${token.value}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(consultation),
        }).then(res => res.json()).then(res => {
            router.push({ name: 'dashboard' })
        }).catch(err => console.log(err))
    }
</script>

<template>
    <AppLayout>
        <!-- S: Header -->
        <HeaderSection :title="title"></HeaderSection>
        <!-- E: Header -->

        <div class="container">

            <form @submit.prevent="store">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="d-flex align-items-center mb-3">
                                <label for="disease-history" class="mr-3 mb-0">Do you have disease history ?</label>
                                <select class="form-control-sm" name="disease_history" v-model="disease_history">
                                    <option value="yes">Yes, I have</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <textarea v-if="disease_history == 'yes'" v-model="consultation.disease_history" id="disease-history" class="form-control" cols="30" rows="10" placeholder="Describe your disease history"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="d-flex align-items-center mb-3">
                                <label for="current-symptoms" class="mr-3 mb-0">Do you have symptoms now ?</label>
                                <select class="form-control-sm" name="current_symptoms" v-model="current_symptoms">
                                    <option value="yes">Yes, I have</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <textarea v-if="current_symptoms == 'yes'" v-model="consultation.current_symptoms" id="current-symptoms" class="form-control" cols="30" rows="10" placeholder="Describe your current symptoms"></textarea>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Send Request</button>
            </form>

        </div>
    </AppLayout>
</template>