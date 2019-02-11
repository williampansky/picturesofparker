<script>
export default {
    name: 'is-signed-in',
    computed: {
        isSignedIn() {
            return this.$isSignedIn();
        }
    }
};
</script>
