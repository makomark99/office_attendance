<template>
    <Button class="day position-relative"
            :severity="badgeSeverity"
            raised
            @click="setModalInfos"
            :disabled="!isActualMonth">      
        <div class="bg-danger rounded-circle position-absolute top-0 start-100 translate-middle"
             v-if="extraEvent"
             style="width: 25px; height: 25px;">
        </div>
        <div class="number">{{ day }}</div>
        <div class="events">
            <div class="badge-container">
                <div class="badges">
                    <Badge class="first-badge"
                           v-if="attendance!==''"
                           :value="attendance"
                           :style="{ backgroundColor: attendanceBadgeColor, color: attendanceTextColor }"></Badge>
                </div>
                <div class="badges">
                    <Badge class="second-badge"
                           v-if="dutyEvent!==''"
                           :value="dutyEvent"
                           :style="{ backgroundColor: dutyEventBadgeColor, color: dutyEventTextColor }"></Badge>
                    <Badge class="second-badge"
                           v-if="standbyEvent!==''"
                           :value="standbyEvent"
                           :style="{ backgroundColor: standbyEventBadgeColor, color: standbyEventTextColor }"></Badge>
                </div>
            </div>
        </div>
    </Button>

    <Dialog v-model:visible="openDialog"
            modal
            :style="{ width: '32rem', height: '45rem' }">
        <template #header>
            <h2>{{ clickedDate }}</h2>
        </template>
        <span class="block mb-5">Update your office attendance information.</span>

        <div class="card flex justify-content-center">
            <div class="grid-container">
                <div class="grid-item">
                    <div class="inner-grid">
                        <div class="inner-grid-item">
                            <Listbox v-model="selectedEventOption"
                                     :options="eventOptions"
                                     optionLabel="name"
                                     class="w-full md:w-12rem"
                                     :optionDisabled="isOptionDisabled">
                                <template class="template" #option="slotProps">
                                    <div class="optionBadge">
                                        <Badge :value="slotProps.option.code"
                                               :style="{ backgroundColor: slotProps.option.bgColor, color: slotProps.option.textColor }" />
                                        <div style="margin-left: 0.5rem;">{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Listbox>
                        </div>
                        <div class="inner-grid-item">
                            <Listbox v-model="selectedEventOption"
                                     :options="eventOptions2"
                                     optionLabel="name"
                                     class="w-full md:w-12rem"
                                     :optionDisabled="isOptionDisabled">
                                <template class="template" #option="slotProps">
                                    <div class="optionBadge">
                                        <Badge :value="slotProps.option.code"
                                               :style="{ backgroundColor: slotProps.option.bgColor, color: slotProps.option.textColor }" />
                                        <div style="margin-left: 0.5rem;">{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Listbox>
                        </div>
                    </div>
                </div>

                <div class="grid-item">
                    <hr class="text-secondary-color my-1" />
                    <Listbox v-model="selectedThirdLevelOption"
                             :options="thirdLevelOptions"
                             optionLabel="name"
                             :optionDisabled="isOptionDisabled"
                             class=" md:w-12rem">
                        <template class="template" #option="slotProps">
                            <div class="optionBadge">
                                <Badge :value="slotProps.option.code"
                                       :style="{ backgroundColor: slotProps.option.bgColor, color: slotProps.option.textColor }" />
                                <div style="margin-left: 0.5rem;">{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Listbox>
                </div>

                <div class="grid-item">
                    <hr class="text-secondary-color my-1" />
                    <Listbox v-model="selectedStandbyOption"
                             :options="standbyOptions"
                             optionLabel="name"
                             :optionDisabled="isOptionDisabled"
                             class=" md:w-12rem">
                        <template class="template" #option="slotProps">
                            <div class="optionBadge">
                                <Badge :value="slotProps.option.code"
                                       :style="{ backgroundColor: slotProps.option.bgColor, color: slotProps.option.textColor }" />
                                <div style="margin-left: 0.5rem;">{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Listbox>
                </div>
                <div class="grid-item">
                    <hr class="text-secondary-color my-1" />
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi-info"></i>
                        </InputGroupAddon>
                        <InputText placeholder="Extra info" id="extraInfo" v-model="extraEvent" />
                    </InputGroup>
                </div>
                
            </div>
        </div>
        

        <div class="flex mt button-container mt-2">
            <Button type="button"
                    label="Cancel"
                    @click="openDialog = false"
                    class="p-button-secondary first-button"></Button>
            <Button type="button"
                    label="Save"
                    @click="openDialog = false"></Button>
        </div>
    </Dialog>


</template>

<script setup>

    //import Button from 'primevue/button';
    import { ref, defineProps, computed } from 'vue';
    import { useEventOptions } from '@/composables/useEventOptions';
    import moment from 'moment';
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';
    import Listbox from 'primevue/listbox';
    import Badge from 'primevue/badge';
    import FloatLabel from 'primevue/floatlabel';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import InputText from 'primevue/inputtext';
    import 'primeicons/primeicons.css'
    //import 'bootstrap/dist/css/bootstrap.min.css';

    const {
        mergedOptions,
        eventOptions,
        eventOptions2,
        thirdLevelOptions,
        standbyOptions
    } = useEventOptions();

    const props = defineProps({
        day: Number,
        isActualMonth: Boolean,
        attendance: String,
        dutyEvent: String,
        standbyEvent: String,
        extraEvent: String,
        isWeekend: Boolean,
        selectedDate: Date
    });


    //const disabledCodes = ref(['S', 'RC', 'I']); // Example: Disable 'Standby'
    const disabledCodes = ref([]); // Example: Disable 'Standby'

    const isOptionDisabled = (option) => {
        return disabledCodes.value.includes(option.code);
    };


    /*Modal info start*/
    const clickedDate = computed(() => {
        return moment(props.selectedDate - 1).format("YYYY. MMMM DD. (dddd)");
    });

    const isDateDisabled = computed(() => {
        const currentDate = new Date();
        return this.date < currentDate || !props.isActualMonth;
    })


    const selectedEventOption = ref({ name: '', code: '', color: '' });
    const selectedThirdLevelOption = ref({ name: '', code: '', color: '' })
    const selectedStandbyOption = ref({ name: '', code: '', color: '' })
    const extraEvent = ref("")

    const updateSelectedEventOption = (code) => {
        const option = mergedOptions.find(option => option.code === code);
        if (option) {
            selectedEventOption.value = { ...option };
        }
    };
    const updateThirdLevelEventOption = (code) => {
        const option = mergedOptions.find(option => option.code === code);
        if (option) {
            selectedThirdLevelOption.value = { ...option };
        }
    };
    const updateStandbyOption = (code) => {
        const option = mergedOptions.find(option => option.code === code);
        if (option) {
            selectedStandbyOption.value = { ...option };
        }
    };
  

    function setModalInfos() {
        openDialog.value = true;
        updateSelectedEventOption(props.attendance);
        updateThirdLevelEventOption(props.dutyEvent);
        updateStandbyOption(props.standbyEvent);
    }
    /*Modal info end*/

    const attendanceBadgeColor = computed(() => {
    const option = mergedOptions.find(option => option.code === props.attendance);
        return option ? option.bgColor : null;
    });
    const dutyEventBadgeColor = computed(() => {
        const option = mergedOptions.find(option => option.code === props.dutyEvent);
        return option ? option.bgColor : null;
    });
    const standbyEventBadgeColor = computed(() => {
        const option = mergedOptions.find(option => option.code === props.standbyEvent);
        return option ? option.bgColor : null;
    });
    

    const attendanceTextColor = computed(() => {
    const option = mergedOptions.find(option => option.code === props.attendance);
        return option ? option.textColor : null;
    });
    const dutyEventTextColor = computed(() => {
        const option = mergedOptions.find(option => option.code === props.dutyEvent);
        return option ? option.textColor : null;
    });
    const standbyEventTextColor = computed(() => {
        const option = mergedOptions.find(option => option.code === props.standbyEvent);
        return option ? option.textColor : null;
    });
    

    const badgeSeverity = computed(() => {
        if (props.isWeekend && props.isActualMonth) {
            return 'danger'
        }
        else if (!props.isActualMonth) {
            return 'secondary'
        }
        else return 'contrast'
    })

    const openDialog = ref(false);


    /* ---

    // Computed properties to filter options
    const filteredEventOptions = computed(() => {
      // Get the codes that need to be filtered out based on the selected values
      const codesToFilterOut = ['RC', 'S', 'I'];
      const selectedCodes = [
        selectedEventOption.value?.code,
        selected3rdLvlOptions.value?.code,
        selectedStandbyOption.value?.code
      ].filter(code => code);

      // Add selected codes to the filter out list
      selectedCodes.forEach(code => {
          if (code === 'D1' ||
              code === 'D2' ||
              code === 'D0' ||
              code === 'PL' ||
              code === 'OO' ||
              code === 'M' ||
              code === 'O') {
          codesToFilterOut.push('RC', 'S', 'I');
        }
      });

      return eventOptions.filter(option => !codesToFilterOut.includes(option.code));
    });

    const filtered3rdLvlOptions = computed(() => {
      // Get the codes that need to be filtered out based on the selected values
      const codesToFilterOut = ['RC', 'S', 'I'];
      const selectedCodes = [
        selectedEventOption.value?.code,
        selected3rdLvlOptions.value?.code,
        selectedStandbyOption.value?.code
      ].filter(code => code);

      // Add selected codes to the filter out list
      selectedCodes.forEach(code => {
        if (code === 'D1' || code === 'D2' || code === 'D0' || code === 'PL' || code === 'OO' || code === 'M' || code === 'O') {
          codesToFilterOut.push('RC', 'S', 'I');
        }
      });

      return eventOptions2.filter(option => !codesToFilterOut.includes(option.code));
    });

    const filteredStandbyOptions = computed(() => {
      // Get the codes that need to be filtered out based on the selected values
      const codesToFilterOut = ['RC', 'S', 'I'];
      const selectedCodes = [
        selectedEventOption.value?.code,
        selected3rdLvlOptions.value?.code,
        selectedStandbyOption.value?.code
      ].filter(code => code);

      // Add selected codes to the filter out list
      selectedCodes.forEach(code => {
        if (code === 'D1' || code === 'D2' || code === 'D0' || code === 'PL' || code === 'OO' || code === 'M' || code === 'O') {
          codesToFilterOut.push('RC', 'S', 'I');
        }
      });

      return standbyOrInstallingOption.filter(option => !codesToFilterOut.includes(option.code));
    });

    //----*/

    const saveChanges = () => {
        // Handle saving changes
        closeDialog();
    };


</script>

<style scoped>
    .day:hover {
        background-color: black !important;
        color: white !important;
    }

    .red-mark {
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 10; /* Make sure the red mark appears above other content */
    }

    .optionBadge {
        display: flex;
    }

    .template {
        margin-top: 0px !important;
        padding-top: 0px !important;
    }

    hr {
        background-color: var(--primary-color);
        height: 3px;
        margin-right: 5px;
        margin-left: 5px;
    }

    .second-badge {
        margin-top: 10px;
    }

    .badges {
        height: calc(50% - 5px);
        margin: 1.1px 0px;
    }

    .day {
        width: 75px;
        height: 75px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5px;
        padding: 0;
        position: relative;
    }

    .badge-container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

  

    .first-button {
        margin-right: 5px;
    }

    .number {
        height: 60%;
        padding-top: 8px;
        font-size: 22px;
        font-weight: bold;
    }

    .events {
        height: 40%;
        padding: 4px;
        font-size: 10px;
        margin-bottom: 10px;
    }

    .grid-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centers items horizontally */
    }

    .grid-item {
        width: 100%;
    }

    .inner-grid {
        display: flex;
    }

    .inner-grid-item {
        flex: 1;
    }

    .button-container {
        display: inline-block;
    }

    .option-disabled {
        opacity: 0.5; /* Make the option look disabled */
        text-decoration: line-through; /* Cross out the text */
        pointer-events: none; /* Prevent interaction with the option */
        cursor: not-allowed;
    }
</style>
