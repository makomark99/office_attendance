<template>
    <div class="container">
        <Badge v-for="(option, index) in mergedOptions"
               :key="index"
               :value="`${option.name} - ${option.code}`"
               :style="{ backgroundColor: option.bgColor, color: option.textColor }"
               class="item">
        </Badge>
    </div>

</template>

<script setup>
    import Badge from 'primevue/badge';
    import { useEventOptions } from '@/composables/useEventOptions';
    const { mergedOptions } = useEventOptions();
</script>

<style scoped>
    div {
        margin: 20px
    }

    .container {
        display: flex;
        flex-wrap:  wrap ;
    }
    .item{
        margin-right: 5px;
        margin-bottom: 5px;
    }
</style>