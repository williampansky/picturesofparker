<template>
    <div
    :class="expand ? 'uk-container-expand' : ''"
    class="uk-container">
        <slot></slot>
    </div>
</template>


<script>
/**
 * @module Container
 * @see [UIkit]{@link https://getuikit.com/docs/container}
 */
export default {
    name: 'Container',
    props: {
        expand: {
            type: Boolean,
            default: false
        }
    }
};
</script>
