<template>
    <div
    :uk-grid="masonry ? 'masonry:true;' : '' "
    :class="[
        expand ? 'uk-grid-collapse' : '',
        large ? 'uk-grid-large' : '',
        match ? 'uk-grid-match' : '',
        small ? 'uk-grid-small' : ''
    ]"
    class="
    uk-grid
    uk-child-width-1-2
    uk-child-width-1-3@m
    uk-child-width-1-4@l
    uk-child-width-1-6@xl">
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: 'AppGrid',
    props: {
        expand: { type: Boolean, default: false },
        large: { type: Boolean, default: false },
        match: { type: Boolean, default: false },
        masonry: { type: Boolean, default: false },
        small: { type: Boolean, default: false }
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
