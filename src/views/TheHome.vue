<template>
    <main class="padding">
        <masonry
        :cols="{ default: 3, 320: 2, 360: 2 }"
        :gutter="20"
        @scrollReachBottom="getData()">
            <AppCard
            v-for="(image, index) in images.mediaItems"
            :key="index"
            :src="image.baseUrl"
            :tags="image.tags"
            :title="image.description"
            :class="imageOrientation(image)"
            class="grid-item"
            @click.native="openAppModal(image, imageOrientation(image))" />
        </masonry>

        <AppModal
        :active="modal.active"
        :ratio="modal.ratio"
        :src="modal.src"
        :tags="modal.tags"
        @click.native="closeAppModal()" />
    </main>
</template>


<script>
/**
 * @module TheHome
 * @version 0.1.6
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
                ratio: null,
                src: null,
                tags: [],
                title: null
            }
        };
    },

    created() {
        this.getPhotos();
    },

    mounted() {
        this.populateGallery();
    },

    computed: {
        ...mapGetters([
            'googlephotos'
        ])
    },

    methods: {
        getPhotos() {
            if (!this.googlephotos.length) {
                this.$gapi._libraryInit('client', {
                    discoveryDocs: [
                        'https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest'
                    ],
                    scope: 'https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata'
                }).then(client => {
                    return client.photoslibrary.mediaItems.search({
                        albumId: 'ANYhfjkLh7AIP69wENU0zbHwygGRBORy3HedJ_jFWwkY6-dZjCCypwic0drrK7k27GLvZ91XfiMC',
                        pageSize: 100
                    }).then(response => {
                        // console.log(response.result);
                        this.$store.commit(
                            'setGooglePhotosRequest', response.result
                        );
                    });
                });
            }
        },

        populateGallery() {
            this.images = this.googlephotos;
        },

        openAppModal(value, ratio) {
            this.$store.commit('openModal');
            this.modal = {
                active: true,
                ratio: ratio,
                src: value.baseUrl,
                tags: value.tags,
                title: value.description
            };
        },

        closeAppModal() {
            this.$store.commit('closeModal');
            this.modal = {
                active: false,
                ratio: null,
                src: null,
                tags: [],
                title: null
            };
        },

        imageOrientation(image) {
            // let orientation;
            // let height = image.mediaMetadata.height;
            // let width = image.mediaMetadata.width;

            // if (width < height) orientation = 'landscape';
            // else if (width > height) orientation = 'portrait';
            // else orientation = 'even';

            // return orientation;
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
