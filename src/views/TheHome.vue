<template>
    <main>
        <section class="uk-container uk-container-expand">
            <AppGrid
            gutter
            masonry
            match>
                <div
                v-for="(image, index) in images"
                :key="index"
                :class="$mq | mq({
                    xs: childWidth(image.height_n, image.width_n),
                    s: childWidth(image.height_n, image.width_n),
                    m: '',
                    l: '',
                    xl: ''
                })">
                    <AppCard
                    :src="constructPhotoUrl(image)"
                    :tags="image.tags"
                    :title="image.title"
                    :imgheight="Number(image.height_n)"
                    :imgwidth="Number(image.width_n)"
                    @click.native="openAppModal(image, index)" />
                </div>
            </AppGrid>
        </section>

        <ImageModal
        v-shortkey="{prev: ['arrowleft'], next: ['arrowright']}"
        v-if="modal.active"
        :fullmodal="$mq | mq({ xs:true, s: true, m: false, l: false, xl: false })"
        :imageProp="modal.image"
        :imageSrc="constructPhotoUrl(modal.image)"
        :imgheight="Number(modal.image.height_l)"
        :imgwidth="Number(modal.image.width_l)"
        :apiKey="api.key"
        close="default"
        variation="image"
        @shortkey="cycleCurrentPhoto()"
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
            api: {
                key: null,
                user: null
            },
            error: null,
            images: [],
            modal: {
                active: false,
                image: null,
                index: null,
                src: null,
                tags: []
            },
            override: false
        };
    },

    created() {
        this.getApiKey();
    },

    mounted() {
        this.refreshApi();
    },

    computed: {
        ...mapGetters([
            'getPhotos'
        ]),
        match() {
            return this.images.find(img => img.id === this.modal.image.id);
        },
        firstImage() {
            return this.images[0];
        }
    },

    methods: {
        /**
         * @see [stackoverflow]{@link https://stackoverflow.com/a/2498500}
         */
        next(number) {
            var index = this.images.indexOf(number);
            index++;
            if (index >= this.images.length) index = 0;
            console.log(this.images[index]);
            return this.images[index];
        },

        /**
         * @method childWidth
         * Applies `uk-width-1-2` to vertical images.
         */
        childWidth(height, width) {
            const h = Number(height);
            const w = Number(width);
            if (w < h) return 'uk-width-1-2';
        },

        refreshApi() {
            // grab photos if not set in localStorage
            setTimeout(() => {
                if (this.api.key && this.api.user) {
                    const photoArray = this.getPhotos;
                    if (this.override === true)
                        this.getPhotosFromApi();
                    else if (photoArray && photoArray.length)
                        this.images = this.getPhotos;
                    else
                        this.getPhotosFromApi();
                }
            }, 2000);
        },

        openAppModal(value, idx) {
            this.modal = {
                active: true,
                image: value,
                index: idx,
                src: this.constructPhotoUrl(value),
                tags: value.tags
            };
        },

        closeAppModal() {
            this.modal = {
                active: false,
                image: null,
                index: null,
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
            const extras = [
                'description',
                'date_upload',
                'date_taken',
                'sizes',
                'tags',
                'url_h', // Large 1600 (1600 x 900)
                'url_l', // Large 1024 (1024 x 576)
                'url_m', // Medium 500 (500 x 281)
                'url_n', // Small 320 (320 x 180)
                'url_o', // Original (3840 x 2160)
                'url_q', // Square 150 (150 x 150)
                'url_t', // Thumbnail (100 x 56)
                'views'
            ].toString();

            this.$axios
                .get(endpoint + method, {
                    params: {
                        api_key: this.api.key,
                        user_id: this.api.user,
                        extras: extras,
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

        getApiKey(value) {
            const prefix = 'https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0';
            const domain = '.sandbox.auth0-extend.com/';
            const affix = 'picturesofparker';
            return this.$axios
                .get(prefix + domain + affix)
                .then(response => {
                    this.api = {
                        key: response.data.key,
                        user: response.data.user
                    };
                })
                .catch(error => {
                    this.error = error;
                    console.error(error);
                });
        },

        cycleCurrentPhoto(event) {
            /* eslint-disable */
            switch (event.srcKey) {
            case 'prev':
                let match = this.images.find(img => img.id === this.modal.image.id);
                // this.openAppModal()
                console.log(this.next(this.match));
                break
            case 'next':
                break
            }
        }
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
