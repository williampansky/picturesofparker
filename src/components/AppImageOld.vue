<template>
    <figure>
        <img
        v-if="status === 'loaded'"
        ref="image"
        :src="source"
        class="image" />

        <div
        v-else-if="status === 'failed'"
        ref="error"
        class="error">
            <span>Error loading image.</span>
        </div>

        <img
        v-else-if="status === 'loading'"
        ref="preloader"
        :src="preloader"
        class="preloader" />

        <div
        v-else-if="status === 'pending'"
        ref="pending"
        class="pending" />
    </figure>
</template>


<script>
/**
 * @see [vue-load-image]{@link https://github.com/john015/vue-load-image}
 * @see [detecting-broken-images]{@link https://stackoverflow.com/a/1977898}
 */
const Status = {
    FAILED: 'failed',
    LOADED: 'loaded',
    LOADING: 'loading',
    PENDING: 'pending'
};

export default {
    name: 'AppImage',
    data() {
        return {
            img: null,
            src: null,
            status: null,
        };
    },
    props: {
        preloader: { type: String },
        source: { type: String }
    },
    mounted() {
        // this.$nextTick(() => {
        //     console.log(this.$el.childNodes);
        //     console.log('$refs.image: ', this.$refs.image);
        //     console.log('$refs.error: ', this.$refs.error);
        //     console.log('$refs.preloader: ', this.$refs.preloader);
        // });
        this.src = this.$refs.image || this.$refs.preloader;
        if (this.src) {
            this.status = Status.LOADING;
            this.createLoader();
        } else {
            this.status = Status.PENDING;
        }
    },
    updated() {
        console.log(this.$el.childNodes);
        const receivedSrc = this.$refs.image || this.$refs.preloader;
        if (this.status === Status.LOADING && !this.img) {
            this.createLoader();
        } else if (this.src !== receivedSrc) {
            this.src = receivedSrc;
            this.createLoader();
        }
    },
    watch: {
        src(value) {
            this.status = value ? Status.LOADING : Status.PENDING;
        }
    },
    methods: {
        createLoader() {
            this.destroyLoader();
            this.img = new Image();
            this.img.onload = this.handleLoad;
            this.img.onerror = this.handleError;
            this.img.src = this.src;
        },
        destroyLoader() {
            if (this.img) {
                this.img.onload = null;
                this.img.onerror = null;
                this.img = null;
            }
        },
        handleLoad() {
            this.destroyLoader();
            this.status = Status.LOADED;
            this.$emit('onLoad');
        },
        handleError(error) {
            this.destroyLoader();
            this.status = Status.FAILED;
            this.$emit('onError', error);
        }
    }
};
</script>


<style lang="scss" scoped>
figure {
    margin: 0;
}

.pending {
    cursor: wait;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18), 0 2px 15px rgba(0, 0, 0, 0.08);
    min-height: 150px;
    position: relative;
    @include display-flex(column nowrap, center, space-between);
    @include animation-swipe;
}
</style>
