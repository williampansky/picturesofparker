export default {
    name: 'connection',
    created() {
        this.connection.addEventListener(
            'change', this.updateConnectionStatus
        );
    },
    beforeDestroy() {
        this.connection.removeEventListener(
            'change', this.updateConnectionStatus
        );
    },
    computed: {
        connection() {
            const connection = navigator.connection ||
                navigator.mozConnection ||
                navigator.webkitConnection;
            return connection;
        },
        type() {
            return this.connection.effectiveType;
        }
    },
    methods: {
        updateConnectionStatus() {
            console.log(
                'Connection type changed from ' +
                `${this.type} to ${this.connection.effectiveType}`
            );
        }
    }
};
