<template>
    <div>
        <h1>{{ yearMonth }}</h1>
        <Calendar v-model="calendar[0][0].actualDate.toISOString().split('T')[0]" showIcon disabled  />
        <span > - </span>
        <Calendar v-model="calendar[5][6].actualDate.toISOString().split('T')[0]" showIcon disabled />
       
        <table>
            <thead>
                <tr>
                    <th v-for="day in weekDays" :key="day">
                        {{ day }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, weekIndex) in calendar" :key="weekIndex">
                    <td v-for="(dayInfo, dayIndex) in week" :key="dayIndex">
                        <CalendarDay :day="dayInfo.day"
                                     :isActualMonth="dayInfo.isActualMonth"
                                     :attendance="events[dayInfo.index].attendance"
                                     :dutyEvent="events[dayInfo.index].dutyEvent"
                                     :standbyEvent="events[dayInfo.index].standbyEvent"
                                     :extraEvent="events[dayInfo.index].extraEvent"
                                     :isWeekend="isWeekend(dayIndex)"
                                     :selectedDate="dayInfo.actualDate" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup>
    import { ref, watchEffect, defineProps, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import CalendarDay from './CalendarDay.vue';
    import Calendar from 'primevue/calendar';
    import moment from 'moment';
    const router = useRouter()
    const route = useRoute()

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const events = [
        { "attendance": '', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": 'D2', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": 'RC', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'SO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": 'I', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": 'I', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'D1', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'D1', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'D1', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'D1', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'SO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'OO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'OO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": 'Hardware change' },
        { "attendance": '', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": 'RC', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": 'MD', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'M', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'T4', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'D1', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": '', "extraEvent": "" },
        { "attendance": 'HO', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": "" },
        { "attendance": '', "dutyEvent": '', "standbyEvent": 'S', "extraEvent": 'asd' }
    ];

    // const events = [
    //     '', 'HO', 'HO', 'HO', 'HO', '', '',
    //     'D2', 'HO', 'HO', '', 'SO', '', '',
    //     'D1', 'D1', 'D1', 'D1', 'SO', 'OO', 'OO',
    //     '', '', 'HO', 'HO', 'MD', '', '',
    //     '', 'HO', 'HO', 'M', 'HO', '', '',
    //     'HO', 'T4', 'D1', '', 'HO', '', ''
    // ];
    // const dutyEvents = [
    //     '', '', '', '', '', '', '',
    //     '', '', '', 'RC', '', 'I', 'I',
    //     '', '', '', '', '', '', '',
    //     '', '', '', 'RC', '', '', '',
    //     '', '', '', '', '', '', '',
    //     '', '', '', '', '', '', '',
    // ];
    // const standbyEvents = [
    //     '', '', '', '', 'S', 'S', 'S',
    //     '', '', '', '', '', '', '',
    //     '', '', '', '', '', '', '',
    //     'S', 'S', 'S', 'S', '', '', '',
    //     '', '', '', '', '', '', '',
    //     '', '', '', '', 'S', 'S', 'S',
    // ];
    // const extraEvents = [
    //     '', '', '', '', '', '', '',
    //     '', '', '', '', '', '', '',
    //     '', '', '', '', '', '', '',
    //     'Hardware change', '', '', '', '', '', '',
    //     '', '', '', '', '', '', '',
    //     '', '', '', '', '', '', '',
    // ];
    
    const props = defineProps(
        {
            selectedDate: {
                type: Date
            }
        }
    );

    const yearMonth = computed(() => {
        return moment(props.selectedDate).format("YYYY. MMMM");
    });

    const counter = ref(0);

    // Function to increment the counter
    const incrementCounter = () => {
        return ++counter.value;
    };

    let calendar = ref([]);

    // Watch for changes in selectedDate prop
    watchEffect(() => {
        updateCalendar();
    });

    function isWeekend(dayIndex) {
        return dayIndex === 5 || dayIndex === 6;
    }

    // Method to update the calendar based on the selected date
    function updateCalendar() {
        let date = props.selectedDate;
        let year = date.getFullYear();
        let month = date.getMonth();

        let daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
        let startingDay = new Date(year, month, 1).getDay(); // Starting day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)

        // Adjust startingDay to start from Monday (0: Monday, 1: Tuesday, ..., 6: Sunday)
        startingDay = startingDay === 0 ? 6 : startingDay - 1;

        // Get the number of days in the previous month
        let daysInPrevMonth = new Date(year, month, 0).getDate();

        let dayCount = 1;
        let idx = 0;
        let newCalendar = [];

        // Loop through weeks
        for (let i = 0; i < 6; i++) {
            let week = [];

            // Loop through days in week
            for (let j = 0; j < 7; j++) {
                let dayInfo = {};
                if (i === 0 && j < startingDay) {
                    // Fill in the days from the previous month
                    dayInfo.day = daysInPrevMonth - startingDay + j + 1;
                    dayInfo.index = idx++;
                    dayInfo.isActualMonth = false; // Not in the current month
                    dayInfo.actualDate = new Date(year, month - 1, dayInfo.day + 1);
                } else if (dayCount <= daysInMonth) {
                    // Fill in the days of the month
                    dayInfo.day = dayCount;
                    dayInfo.index = idx++;
                    dayInfo.isActualMonth = true; // In the current month
                    dayCount++;
                    dayInfo.actualDate = new Date(year, month, dayInfo.day + 1);
                } else {
                    // Fill in the days from the next month
                    dayInfo.day = dayCount - daysInMonth;
                    dayInfo.index = idx++;
                    dayInfo.isActualMonth = false; // Not in the current month
                    dayCount++;
                    dayInfo.actualDate = new Date(year, month+1, dayInfo.day + 1);
                }
                // Create Date object with year, month, and day
                week.push(dayInfo);
            }

            // Push the week to the calendar
            newCalendar.push(week);
        }

        // Update the calendar
        calendar.value = newCalendar;
        console.log(JSON.stringify(calendar.value));
   
    }

  

</script>




<style scoped>
    .main {
        margin-top: 20px;
    }
    h1 {
        text-align: center;
        margin:10px;
        color: white;
        
    }
   
</style>

