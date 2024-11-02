

<template>
    
    <!-- https://blocks.primevue.org/application/navbar -->

    <EventOptions />

    <DateForm />

</template>

<script setup>
    import EventOptions from './components/EventOptions.vue'
    import DateForm from './components/DateForm.vue';
    import CalendarSpeedDial from './components/CalendarSpeedDial.vue'
    import Navbar from './components/Navbar.vue';


</script>

<style scoped>
    nav{
        width: 100% !important;
    }


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.speedDial{
    padding-left: 200px;
    padding-top: 100px;
    height: 15rem;
}

/* Ensure header and main are stacked vertically */


/* Add styling for header and main */
header {
    background-color: #333;
    color: white;
    padding: 0px;
}

main {
    padding: 10px;
}

</style>
