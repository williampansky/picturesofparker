<template>
    <article
    v-if="active"
    uk-modal
    class="uk-modal">
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
        src: { type: String },
        tags: { type: Array, default: () => [] },
        title: { type: String }
    }
};
</script>


<style lang="scss" scoped>
article {
    animation-name: scale-up;
    animation-duration: 400ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
    background: rgba(0, 0, 0, 0.6);
    height: 100vh;
    overflow-y: auto;
    width: 100vw;
    transition: opacity 0.15s linear;
    z-index: 1100;
    @include position-fixed(0, 0, 0, 0);
    -webkit-overflow-scrolling: touch;

    header {
        height: 100vh;
        @include display-flex(column nowrap, center, center);
    }

    img {
        object-fit: cover;
        height: 100vh;
        margin: 0 auto;
        width: auto;
    }

    footer {
        display: none;
    }
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
