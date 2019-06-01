/**
 * Uses the Network Information API to return information regarding
 * a users connection type; such as 4g/3g speeds or cell/wifi type.
 *
 * @mixin connection
 * @see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API}
 * @see [caniuse]{@link https://caniuse.com/#feat=netinfo}
 */
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
            return navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;
        },
        connectionFrom() {
            return this.connection.effectiveType;
        }
    },
    methods: {
        updateConnectionStatus() {
            console.log(
                'Connection type changed from ' +
                `${this.connectionFrom} to ${this.connection.effectiveType}`
            );
        }
    }
};
