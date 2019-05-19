<template>
    <div
    v-if="type === 'grid-item'"
    class="grid-item-placeholder" />
    <div
    v-else-if="type === 'text-item'"
    class="text-item-placeholder" />
    <div
    v-else-if="type === 'text-item-dark'"
    class="text-item-dark-placeholder" />
</template>


<script>
export default {
    name: 'Placeholder',
    props: {
        type: {
            type: String,
            required: true
        }
    }
};
</script>


<style lang="scss" scoped>
.grid-item-placeholder {
    cursor: wait;
    height: 100%;
    min-height: 150px;
    position: relative;
    width: 100%;
    @include display-flex(column nowrap, center, space-between);
    @include animation-swipe;
}

.text-item-placeholder {
    display: inline-block;
    height: 24px;
    margin-top: 5px;
    width: 50%;
    @include animation-swipe;
}

.text-item-dark-placeholder {
    display: inline-block;
    height: 18px;
    width: 50%;
    @include animation-swipe-dark;
}
</style>
