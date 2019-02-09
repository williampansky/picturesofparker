<template>
    <span>
        {{ text }}
    </span>
</template>


<script>
export default {
    name: 'AppTag',
    props: {
        text: {
            type: String
        }
    }
};
</script>


<style lang="scss" scoped>
span {
    display: inline-block;
    padding: 0 10px;
    background: #333;
    line-height: 1.5;
    font-size: 12px;
    color: #fff;
    vertical-align: middle;
    white-space: nowrap;
    border-radius: 2px;
    text-transform: uppercase;
}
</style>
