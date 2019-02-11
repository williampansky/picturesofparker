<script>
export default {
    name: 'login-shortcut-check',

    methods: {
        login() {
            if (this.$isAuthenticated() !== true)
                this.$login();
        }
    }
};
</script>
