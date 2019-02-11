<template>
    <transition name="modal">
        <article
        v-if="active"
        :class="ratio"
        class="modal">
            <header>
                <AppImage :src="src" />
            </header>
            <footer v-if="tags.length">
                <AppTag
                v-for="(tag, idx) in tags"
                :key="idx"
                :index="idx"
                :text="tag.text" />
            </footer>
        </article>
    </transition>
</template>


<script>
import AppImage from '@/components/AppImage.vue';
import AppTag from '@/components/AppTag.vue';
export default {
    name: 'AppModal',
    components: {
        AppImage,
        AppTag
    },
    props: {
        active: { type: Boolean, default: false },
        ratio: { type: String },
        src: { type: String },
        tags: { type: Array, default: () => [] },
        title: { type: String }
    }
};
</script>


<style lang="scss" scoped>
article {
    background: rgba(0, 0, 0, 0.875);
    height: 100vh;
    overflow-y: auto;
    width: 100vw;
    transition: opacity 0.15s linear;
    z-index: 1100;
    @include position-fixed(0, 0, 0, 0);
    -webkit-overflow-scrolling: touch;

    header {
        height: 100vh;
        padding: 20px;
        @include display-flex(column nowrap, center, center);
    }

    img {
        object-fit: cover;
        margin: 0 auto;
    }

    &.horizontal img {
        height: auto;
        width: 100vw;
    }

    &.vertical img {
        height: 100vh;
        width: auto;
    }

    footer {
        display: none;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s;
}

.modal-enter,
.modal-leave-to {
    opacity: 0;
}

@keyframes scale-up {
    0% {
        opacity: 0;
        transform: scale(0.2);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>


<style lang="scss">
.modal-open {
    overflow: hidden;
}
</style>
