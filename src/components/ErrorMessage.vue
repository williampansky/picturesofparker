<template>
    <p class="uk-text-danger">{{
        message
    }}</p>
</template>


<script>
/**
 * @module ErrorMessage
 * @see [UIkit]{@link https://getuikit.com/docs/text#text-color}
 */
export default {
    name: 'ErrorMessage',
    props: {
        message: {
            type: String,
            default: 'Error'
        }
    }
};
</script>
