<template>
    <div
    class="image-loader"
    />
</template>


<script>
export default {
    name: 'AppLoader'
};
</script>


<style lang="scss" scoped>
.image-loader {
    cursor: wait;
    // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18),
    //     0 2px 15px rgba(0, 0, 0, 0.08);
    height: 100%;
    min-height: 150px;
    position: relative;
    width: 100%;
    @include display-flex(column nowrap, center, space-between);
    @include animation-swipe;
}
</style>
