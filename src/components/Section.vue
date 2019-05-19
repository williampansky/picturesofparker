<template>
    <section class="uk-section uk-section-small">
        <slot></slot>
    </section>
</template>


<script>
/**
 * @module Section
 * @see [UIkit]{@link https://getuikit.com/docs/section}
 */
export default {
    name: 'Section'
};
</script>


<style lang="scss" scoped>
.uk-section-small {
    padding: 15px 0;

    @include breakpoint('small') {
        padding: 30px 0;
    }

    @include breakpoint('medium') {
        padding: 40px 0;
    }
}
</style>
