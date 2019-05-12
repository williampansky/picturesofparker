<template>
    <div
    :uk-grid="masonry ? 'masonry:true;' : '' "
    :class="[
        gutter ? 'uk-grid-small' : 'uk-grid-collapse'
    ]"
    class="
    uk-grid
    uk-child-width-1-2
    uk-child-width-1-3@m
    uk-child-width-1-4@l">
        <slot></slot>
    </div>
</template>


<script>
// uk-child-width-1-2 uk-child-width-1-3@m
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
