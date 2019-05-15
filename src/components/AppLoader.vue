<template>
    <lazy-component @show="handler">
        <div
        class="image__loader"
        width="100%"
        height="150px">
    </lazy-component>
</template>


<script>
export default {
    name: 'AppLoader',
    methods: {
        handler(component) {
            console.log('this component is showing');
        }
    }
};
</script>


<style lang="scss" scoped>
.image__loader {
    cursor: wait;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18), 0 2px 15px rgba(0, 0, 0, 0.08);
    height: 100%;
    min-height: 150px;
    position: relative;
    width: 100%;
    @include display-flex(column nowrap, center, space-between);
    @include animation-swipe;
}
</style>
