<template>
    <main>
        <section class="uk-container">
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
        </section>

        <ImageModal
        v-if="modal.active"
        :imageProp="modal.image"
        :apiKey="api.key"
        close="outside"
        variation="image"
        @close="closeAppModal()" />
    </main>
</template>


<script>
/**
 * @module TheHome
 * @version 0.1.2
 */
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
// import AppModal from '@/components/AppModal.vue';
import ImageModal from '@/components/ImageModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'TheHome',

    components: {
        AppCard,
        AppGrid,
        ImageModal
    },

    data() {
        return {
            apiKey: {
                key: null,
                user: null
            },
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
        // apply credentials.json key to $vm.data
        if (process.env.NODE_ENV === 'production') {
            this.api = {
                key: process.env.API_KEY,
                user: process.env.USER_ID
            };
        } else {
            this.api = {
                key: process.env.VUE_APP_APIKEY,
                user: process.env.VUE_APP_APIUSER
            };
        }

        this.consoleLogs();
    },

    mounted() {
        this.refreshApi();
    },

    computed: {
        ...mapGetters([
            'getPhotos'
        ])
    },

    methods: {
        consoleLogs() {
            if (process.env.NODE_ENV === 'production') {
                console.log('NODE_ENV:', process.env.NODE_ENV);
                console.log('USER_ID:', process.env.USER_ID);
            } else {
                console.log('NODE_ENV:', process.env.NODE_ENV);
                console.log('VUE_APP_APIUSER:', process.env.VUE_APP_APIUSER);
            }
        },
        refreshApi() {
            // grab photos if not set in localStorage
            const photoArray = this.getPhotos;
            if (photoArray && photoArray.length) this.images = this.getPhotos;
            else this.getPhotosFromApi();
        },
        openAppModal(value) {
            this.modal = {
                active: true,
                image: value,
                src: this.constructPhotoUrl(value),
                tags: value.tags
            };
        },

        closeAppModal() {
            this.modal = {
                active: false,
                image: null,
                src: null,
                tags: []
            };
        },

        constructPhotoUrl(value) {
            // https://farm{farm-id}.staticflickr.com/
            // {server-id}/{id}_{secret}.(jpg|gif|png)
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
                        api_key: this.api.key,
                        user_id: this.api.user,
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
        },

        // getApiKey(value) {
        //     return this.$axios
        //         .get(value)
        //         .then(({ data }) => {
        //             return data.key;
        //         })
        //         .catch(error => {
        //             return error;
        //         });
        // }
    }
};
</script>


<style lang="scss" scoped>
main {
    $gutter: 15px;
    padding-top: $gutter;
    padding-bottom: $gutter;

    @include breakpoint('small') {
        $gutter: 30px;
        padding-top: $gutter;
        padding-bottom: $gutter;
    }

    @include breakpoint('medium') {
        $gutter: 40px;
        padding-top: $gutter;
        padding-bottom: $gutter;
    }
}
</style>
