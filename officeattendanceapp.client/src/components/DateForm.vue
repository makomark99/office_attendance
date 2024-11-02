<template>
    <div class="row">
        <div class="col-5">
            <Calendar v-model="date"
                      showIcon
                      view="month"
                      dateFormat="yy-mm"
                      :minDate="minDate"
                      :maxDate="maxDate"
                      :showButtonBar="true"
                      placeholder="Select a date" />
        </div>
    </div>
    <CustomCalendar :selectedDate="new Date(formattedDate)" />
</template>

<script setup>
    import { ref, computed } from "vue";
    import CustomCalendar from './CustomCalendar.vue';
    import Calendar from 'primevue/calendar';

    // Set the default date value to the current year and month
    let currentDate = new Date();
    let year = currentDate.getFullYear();

    // Set the maximum selectable date to the end of the current year
    let maxDate = new Date(year + 1, 11, 31);
    let minDate = new Date(year - 1, 0);

    // Initialize the selected date with the default date
    const date = ref(currentDate);

    // Compute the formatted date string
    const formattedDate = computed(() => {
        
        const month = String(date.value.getMonth() + 1).padStart(2, '0');
        return `${year}/${month}`;
    });
    
   
</script>