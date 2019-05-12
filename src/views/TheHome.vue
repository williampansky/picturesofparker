<template>
    <div>
        <AppGrid
        gutter
        masonry>
            <div
            v-for="(image, index) in images"
            :key="index">
                <AppCard
                :src="constructPhotoUrl(image)"
                :tags="image.tags"
                @click.native="openAppModal(image)" />
            </div>
        </AppGrid>

        <AppModal
        v-if="modal.active"
        @click.native="closeAppModal()"
        @close="modal.active === false">
            <template slot="body">
                <img
                :src="modal.src">
            </template>
        </AppModal>
    </div>
</template>


<script>
/**
 * @module TheHome
 * @version 0.1.2
 */
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppModal from '@/components/AppModal.vue';
import credentials from '@/auth/credentials.json';
import { mapGetters } from 'vuex';

export default {
    name: 'TheHome',

    components: {
        AppCard,
        AppGrid,
        AppModal
    },

    data() {
        return {
            error: null,
            images: [],
            modal: {
                active: false,
                src: null,
                tags: []
            }
        };
    },

    created() {
        const photoArray = this.getPhotos;
        if (photoArray && photoArray.length) this.images = this.getPhotos;
        else this.getPhotosFromApi();
    },

    computed: {
        ...mapGetters([
            'getPhotos'
        ])
    },

    methods: {
        openAppModal(value) {
            this.modal = {
                active: true,
                src: this.constructPhotoUrl(value),
                tags: value.tags
            };
        },

        closeAppModal() {
            this.modal = {
                active: false,
                src: null,
                tags: []
            };
        },

        constructPhotoUrl(value) {
            // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.(jpg|gif|png)
            return 'https://farm' + value.farm +
                '.staticflickr.com/' + value.server +
                '/' + value.id + '_' + value.secret +
                '.jpg';
        },

        getPhotosFromApi() {
            const endpoint = 'https://api.flickr.com/services/rest/?method=';
            const method = 'flickr.people.getPhotos';
            this.$axios
                .get(endpoint + method, {
                    params: {
                        api_key: credentials.key,
                        user_id: credentials.user,
                        format: 'json',
                        nojsoncallback: 1
                    }
                })
                .then(response => {
                    const data = response.data.photos.photo;
                    this.images = data;
                    this.commitPhotosToStore(data);
                })
                .catch(error => {
                    this.error = error;
                    console.log(error);
                });
        },

        commitPhotosToStore(value) {
            this.$store.commit('setPhotos', value);
        }
    }
};
</script>
