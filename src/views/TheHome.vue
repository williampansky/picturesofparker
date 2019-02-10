<template>
    <main class="padding">
        <masonry
        :cols="{ default: 3, 320: 2, 640: 3 }"
        :gutter="20"
        @scrollReachBottom="getData()">
            <AppCard
            v-for="(image, index) in images"
            :key="index"
            :src="image.urls.small"
            :tags="image.tags"
            :class="{ 'vertical': imageRatio(image) }"
            class="grid-item"
            @click.native="openAppModal(image)" />
        </masonry>

        <AppModal
        :active="modal.active"
        :src="modal.src"
        :tags="modal.tags"
        @click.native="closeAppModal()" />
    </main>
</template>


<script>
/**
 * @module TheHome
 * @version 0.1.5
 */
import AppCard from '@/components/AppCard.vue';
import AppModal from '@/components/AppModal.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'TheHome',

    components: {
        AppCard,
        AppModal
    },

    data() {
        return {
            images: [],
            modal: {
                active: false,
                src: null,
                tags: []
            }
        };
    },

    created() {
        this.getPhotos();
    },

    mounted() {
        this.populateGallery();
        this.login();
    },

    computed: {
        ...mapGetters([
            'unsplash'
        ])
    },

    methods: {
        login() {
            this.$getGapiClient()
                .then(gapi => {
                    console.log(gapi);
                    gapi.client.directory.users.photos.get('https://photoslibrary.googleapis.com/v1/sharedAlbums/wLNhEZECrSFWAnZT7');
                    // ...
                });
        },
        openAppModal(value) {
            this.$store.commit('openModal');
            this.modal = {
                active: true,
                src: value.urls.regular,
                tags: value.tags
            };
        },

        closeAppModal() {
            this.$store.commit('closeModal');
            this.modal = {
                active: false,
                src: null,
                tags: []
            };
        },

        imageRatio(image) {
            if (image.height > image.width) return true;
        },

        populateGallery() {
            this.images = this.unsplash;
        },

        getPhotos() {
            if (!this.unsplash.length) {
                this.$axios.get('https://api.unsplash.com/photos', {
                    params: {
                        client_id: `e0189fb4f38b295efd2a61a1d073d62987\
                        c1ef03acc3631e979b84ede659a42d`
                    }
                })
                    .then((response) => {
                        this.$store.commit(
                            'setUnsplashRequest', response.data
                        );
                    }).catch((error) => {
                        console.error(error);
                    });
            }
        },

        getData() {
            console.log('End.');
        }
    }
};
</script>


<style lang="scss" scoped>
.padding {
    padding: 20px;
}

.grid {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 150px;
    grid-auto-flow: row dense;
}

.grid-item {
    grid-column-start: auto;
    grid-row-start: auto;
    grid-row-end: span 2;
    &.vertical { grid-row-end: span 3; }
    margin-bottom: 20px;
}
</style>
