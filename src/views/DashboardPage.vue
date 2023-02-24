<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router'
    import AppLayout from '@/components/AppLayout.vue';
    import HeaderSection from '@/components/HeaderSection.vue';

    let loggedIn = ref(localStorage.getItem('loggedIn'))
    let token = ref(localStorage.getItem('token'))
    let router = useRouter()

    onMounted(() => {
        if(!loggedIn.value) {
            router.push({ name: 'login' })
        }
    })

    let consultation = ref(false)

    fetch(`http://localhost:8000/api/v1/consultations?token=${token.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(res => {
        if(res.consultation != null) {
            console.log(res.consultation)
            consultation.value = res.consultation
        }
    }).catch(err => console.log(err))

    let vaccinations = ref(false)

    fetch(`http://localhost:8000/api/v1/vaccinations?token=${token.value}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(res => {
        if(res.vaccinations.first != null) {
            console.log(res.vaccinations)
            vaccinations.value = res.vaccinations
        }
    }).catch(err => console.log(err))

    const title = ref('Dashboard')
</script>

<template>
    <AppLayout>
        <!-- S: Header -->
        <HeaderSection :title="title"></HeaderSection>
        <!-- E: Header -->

        <div class="container">

            <!-- S: Consultation Section -->
            <section class="consultation-section mb-5">
                <div class="section-header mb-3">
                    <h4 class="section-title text-muted">My Consultation</h4>
                </div>
                <div class="row">

                    <!-- S: Link to Request Consultation -->
                    <div v-if="consultation == false" class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header">
                                <h5 class="mb-0">Consultation</h5>
                            </div>
                            <div class="card-body">
                                <a href="">+ Request consultation</a>
                            </div>
                        </div>
                    </div>
                    <!-- E: Link to Request Consultation -->

                    <!-- S: Society Consultation Box -->
                    <div v-else class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header border-0">
                                <h5 class="mb-0">Consultation</h5>
                            </div>
                            <div class="card-body p-0">
                                <table class="table table-striped mb-0">
                                    <tr>
                                        <th>Status</th>
                                        <td v-if="consultation.status == 'pending'"><span class="badge badge-info">Pending</span></td>
                                        <td v-if="consultation.status == 'declined'"><span class="badge badge-danger">Declined</span></td>
                                        <td v-if="consultation.status == 'accepted'"><span class="badge badge-primary">Accepted</span></td>
                                    </tr>
                                    <tr>
                                        <th>Disease History</th>
                                        <td class="text-muted">{{ consultation.disease_history || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Current Symptoms</th>
                                        <td class="text-muted">{{ consultation.current_symptoms || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Doctor Name</th>
                                        <td class="text-muted">{{ consultation.doctor || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <th>Doctor Notes</th>
                                        <td class="text-muted">{{ consultation.doctor_notes || '-' }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- E: Society Consultation Box -->

                </div>
            </section>
            <!-- E: Consultation Section -->

            <!-- S: List Vaccination Section -->
            <section class="consultation-section mb-5">
                <div class="section-header mb-3">
                    <h4 class="section-title text-muted">My Vaccinations</h4>
                </div>
                <div class="section-body">
                    <div class="row mb-4">

                        <!-- S: First Vaccination info -->
                        <div v-if="consultation == false" class="col-md-12">
                            <div class="alert alert-warning">
                                Your consultation must be approved by doctor to get the vaccine.
                            </div>
                        </div>
                        <!-- E: First Vaccination info -->

                        <!-- S: Link to Register First Vaccination -->
                        <div v-else-if="consultation != false && vaccinations.first == null" class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">First Vaccination</h5>
                                </div>
                                <div class="card-body">
                                    <a href="">+ Register vaccination</a>
                                </div>
                            </div>
                        </div>
                        <!-- E: Link to Register First Vaccination -->

                        <!-- S: First Vaccination Box -->
                        <div v-else class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">First Vaccination</h5>
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-striped mb-0">
                                        <tr>
                                            <th>Status</th>
                                            <td v-if="vaccinations.first.status == 'registered'" class="text-muted"><span class="badge badge-info">Registered</span></td>
                                            <td v-if="vaccinations.first.status == 'done'" class="text-muted"><span class="badge badge-primary">Vaccinated</span></td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td class="text-muted">{{ vaccinations.first.vaccination_date }}</td>
                                        </tr>
                                        <tr>
                                            <th>Spot</th>
                                            <td class="text-muted">{{ vaccinations.first.spot.name || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccine</th>
                                            <td class="text-muted">{{ vaccinations.first.vaccine || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccinator</th>
                                            <td class="text-muted">{{ vaccinations.first.doctor || '-' }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- S: First Vaccination Box -->

                    </div>

                    <div v-if="vaccinations.first != null" class="row">


                        <!-- S: Link to Register Second Vaccination -->
                        <div v-if="consultation != null && vaccinations.second == null" class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">Second Vaccination</h5>
                                </div>
                                <div class="card-body">
                                    <a href="">+ Register vaccination</a>
                                </div>
                            </div>
                        </div>
                        <!-- E: Link to Register Second Vaccination -->

                        <!-- S: Second Vaccination Box -->
                        <div v-else class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">Second Vaccination</h5>
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-striped mb-0">
                                        <tr>
                                            <th>Status</th>
                                            <td v-if="vaccinations.second.status == 'registered'" class="text-muted"><span class="badge badge-info">Registered</span></td>
                                            <td v-if="vaccinations.second.status == 'done'" class="text-muted"><span class="badge badge-primary">Vaccinated</span></td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td class="text-muted">{{ vaccinations.second.vaccination_date }}</td>
                                        </tr>
                                        <tr>
                                            <th>Spot</th>
                                            <td class="text-muted">{{ vaccinations.second.spot.name || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccine</th>
                                            <td class="text-muted">{{ vaccinations.second.vaccine || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Vaccinator</th>
                                            <td class="text-muted">{{ vaccinations.second.doctor || '-' }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- S: Second Vaccination Box -->

                    </div>

                </div>
            </section>
            <!-- E: List Vaccination Section -->

        </div>
    </AppLayout>
</template>