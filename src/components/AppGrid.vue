<template>
    <div
    :uk-grid="{ masonry: 'masonry:true;' }"
    :class="[
        gutter ? 'uk-grid-small' : 'uk-grid-collapse'
    ]"
    class="uk-grid uk-child-width-auto">
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: 'AppGrid',
    props: {
        gutter: { type: Boolean, default: false },
        masonry: { type: Boolean, default: false }
    },
    data() {
        return {
            max: false
        };
    },
};
</script>


<style lang="scss" scoped>
</style>
