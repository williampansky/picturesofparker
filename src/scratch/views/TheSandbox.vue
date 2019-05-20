<template>
    <main>
        <AppCard
        :src="constructPhotoUrl(image)"
        :tags="image.tags"
        :title="image.title"
        :imgheight="Number(image.height_t)"
        :imgwidth="Number(image.width_t)"
        />
    </main>
</template>


<script>
/**
 * View for developing components in isolation.
 * @module TheSandbox
 */
/* eslint-disable */
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import ImageModal from '@/components/ImageModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'TheSandbox',

    components: {
        AppCard,
        AppGrid,
        ImageModal
    },

    data() {
        return {
            error: null,
            image: {}
        };
    },

    mounted() {
        this.getPhotosFromApi();
    },

    computed: {
        ...mapGetters([
            'getPhotos'
        ])
    },

    methods: {
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
            const extras = [
                'description',
                'date_upload',
                'date_taken',
                'sizes',
                'tags',
                'url_l', // Large 1024 (1024 x 576)
                'url_m', // Medium 500 (500 x 281)
                'url_o', // Original (3840 x 2160)
                'url_t', // Thumbnail (100 x 56)
                'views'
            ].toString();
            // const extras = 'description, date_upload, date_taken, sizes, tags, views, url_x';

            this.$axios
                .get(endpoint + method, {
                    params: {
                        api_key: process.env.VUE_APP_APIKEY,
                        user_id: process.env.VUE_APP_APIUSER,
                        extras: extras,
                        format: 'json',
                        nojsoncallback: 1,
                        per_page: 1,
                        page: 1
                    }
                })
                .then(response => {
                    const data = response.data.photos.photo[0];
                    this.image = data;
                })
                .catch(error => {
                    this.error = error;
                    console.error(error);
                });
        }
    }
};
</script>


<style lang="scss" scoped>
// top, center, bottom
// top-center
$component-position: center;

// dark, light
// black, white
$sandbox-background-color: light;

// sandbox wrapper
main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    @if $sandbox-background-color == dark { background: $color-gray-darken-40; }
    @if $sandbox-background-color == light { background: #f8f8f8; }
    @if $sandbox-background-color == black { background: $color-black; }
    @if $sandbox-background-color == white { background: $color-white; }

    @if $component-position == top { justify-content: flex-start; }
    @if $component-position == center { justify-content: center; }
    @if $component-position == bottom { justify-content: flex-end; }

    @if $component-position == top-center {
        justify-content: center;
        section { margin-bottom: 35vh; }
    }
}
</style>
