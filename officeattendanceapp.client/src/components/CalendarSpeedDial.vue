<template>
   
        <div class="card">
            <div :style="{ height: '500px' }" class="flex align-items-center justify-content-center">
                <SpeedDial :model="items" mask="true"  :radius="80" type="circle" buttonClass="p-button-warning" />
                
            </div>
        </div>
 
</template>

<script setup>
    import SpeedDial from 'primevue/speeddial';
    import { ref } from 'vue';
 
    import ToastService from 'primevue/toastservice';
    import { useToast } from 'primevue/usetoast';



    const toast = useToast();
    

    const items = ref([
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                router.push('/fileupload');
            }
        },
        {
            label: 'Vue Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://vuejs.org/'
            }
        }
    ])

    // Define your target ref
    const target = ref(null);
</script>
