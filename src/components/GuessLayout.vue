<script setup>
    function navbar() {
        let navbar = document.getElementById('navbarsExampleDefault')

        navbar.classList.toggle('collapse')
        navbar.classList.toggle('navbar-collapse')
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
                        <router-link class="nav-link" :to="{ name: 'login' }">Loginnn</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main>
        <slot/>
    </main>
</template>