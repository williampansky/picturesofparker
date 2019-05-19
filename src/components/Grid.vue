<template>
    <div
    :uk-grid="masonry ? 'masonry:true;' : ''"
    :class="[
        size ? 'uk-grid-' + size : '',
        match ? 'uk-grid-match' : ''
    ]"
    class="uk-grid
    uk-child-width-1-2
    uk-child-width-1-3@m
    uk-child-width-1-4@l
    uk-child-width-1-6@xl">
        <slot></slot>
    </div>
</template>


<script>
/**
 * @module Grid
 * @see [UIkit]{@link https://getuikit.com/docs/grid}
 */
export default {
    name: 'Grid',
    props: {
        childwidths: { type: Array, default: () => ([]) },
        masonry: { type: Boolean, default: false },
        match: { type: Boolean, default: false },
        size: { type: String, default: 'default' }
    }
};
</script>
