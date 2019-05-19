<template>
    <div>
        <Navbar />
        <Section v-show="loading.images && !error.images">
            <Container expand>
                <Grid
                match
                size="small">
                    <div
                    v-for="n in loaders"
                    :key="n">
                        <Placeholder type="grid-item" />
                    </div>
                </Grid>
            </Container>
        </Section>
        <Section v-if="!loading.images && success.images">
            <SwipeModal :images="images.photo" />
        </Section>
        <Section v-else-if="error.images !== null">
            <Container class="uk-text-center">
                <ErrorMessage :message="error.images" />
                <p><a
                href="#"
                uk-icon="icon: refresh;"
                class="try-again uk-icon"
                @click.prevent="getPhotosFromApi()">
                    <span>Please try again.</span>
                </a></p>
            </Container>
        </Section>
        <Section v-else-if="!loading.images && error.images === null">
            <Container class="uk-text-center">
                <ErrorMessage message="Failed to load images." />
                <p><a
                href="#"
                uk-icon="icon: refresh;"
                class="try-again uk-icon"
                @click.prevent="getPhotosFromApi()">
                    <span>Please try again.</span>
                </a></p>
            </Container>
        </Section>
        <Footer />
        <Offcanvas
        :error="error.tags"
        :loading="loading.tags"
        :photos="getPhotos"
        :tags="tags"
        @photos-clicked="getPhotosFromApi()"
        @tag-clicked="getPhotosFromApi('tag', $event)" />
    </div>
</template>


<script>
/**
 * @module TheHome
 * @version 0.3.1
 */
import Placeholder from '@/components/Placeholder.vue';
import Container from '@/components/Container.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Footer from '@/components/Footer.vue';
import Grid from '@/components/Grid.vue';
import Navbar from '@/components/Navbar.vue';
import Offcanvas from '@/components/Offcanvas.vue';
import Section from '@/components/Section.vue';
import SwipeModal from '@/components/SwipeModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'TheHome',

    components: {
        Placeholder,
        Container,
        ErrorMessage,
        Footer,
        Grid,
        Navbar,
        Offcanvas,
        Section,
        SwipeModal
    },

    data() {
        return {
            api: {
                key: null,
                user: null
            },
            error: {
                api: null,
                images: null,
                tags: null
            },
            images: {},
            loading: {
                images: true,
                tags: true
            },
            loaders: 20,
            override: false,
            showOffcanvas: false,
            success: {
                api: false,
                images: false,
                tags: false
            },
            tags: []
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

        photoextras() {
            return [
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
        }
    },

    methods: {
        refreshApi() {
            // grab photos from API,
            // if not set in localStorage
            setTimeout(() => {
                if (this.api.key && this.api.user) {
                    const photoArray = this.getPhotos;

                    if (this.override === true) {
                        this.getPhotosFromApi();
                    } else if (photoArray && photoArray.length) {
                        this.images = this.getPhotos;
                        this.success.images = true;
                        this.loading = false;
                    } else {
                        this.getPhotosFromApi();
                    }

                    this.getTagsList();
                }
            }, 1200);
        },

        getPhotosFromApi(key, value, timeout = 8000) {
            switch (key) {
                case 'tag':
                    this.images = {};
                    this.loading.images = true;
                    this.error.images = null;
                    this.success.images = false;
                    this.loaders = Number(value.count);

                    this.$axios
                        .get('?method=flickr.photos.search', {
                            params: {
                                api_key: this.api.key,
                                user_id: this.api.user,
                                extras: this.photoextras,
                                tags: value._content,
                                format: 'json',
                                nojsoncallback: 1,
                                timeout: timeout
                            }
                        })
                        .then(response => {
                            const data = response.data.photos;
                            this.images = data;
                            this.success.images = true;
                            setTimeout(() => { this.loading.images = false; }, 1200);
                        })
                        .catch(error => {
                            this.error.images = error.message;
                            this.success.images = false;
                            this.loading.images = false;
                            console.error(error);
                        });
                    break;

                default:
                    this.images = {};
                    this.loading.images = true;
                    this.error.images = null;
                    this.success.images = false;
                    this.loaders = 20;

                    this.$axios
                        .get('?method=flickr.people.getPhotos', {
                            params: {
                                api_key: this.api.key,
                                user_id: this.api.user,
                                extras: this.photoextras,
                                format: 'json',
                                nojsoncallback: 1,
                                timeout: timeout
                            }
                        })
                        .then(response => {
                            const data = response.data.photos;
                            this.images = data;
                            this.success.images = true;
                            setTimeout(() => { this.loading.images = false; }, 1200);
                            this.commitPhotosToStore(data);
                        })
                        .catch(error => {
                            this.error.images = error.message;
                            this.success.images = false;
                            this.loading.images = false;
                            console.error(error);
                        });
                    break;
            }
        },

        commitPhotosToStore(value) {
            this.$store.commit('setPhotos', value);
        },

        getTagsList() {
            this.tags = [];
            this.loading.tags = true;
            this.error.tags = null;
            this.success.tags = false;

            this.$axios
                .get('?method=flickr.tags.getListUserPopular', {
                    params: {
                        api_key: this.api.key,
                        user_id: this.api.user,
                        count: 15,
                        format: 'json',
                        nojsoncallback: 1
                    }
                })
                .then(response => {
                    const data = response.data.who.tags.tag;
                    this.tags = data;
                    this.success.tags = true;
                    this.loading.tags = false;
                })
                .catch(error => {
                    this.success.tags = false;
                    this.error.tags = error.message;
                    this.loading.tags = false;
                    console.log(error);
                });
        },

        getApiKey(value) {
            const prefix = 'https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0';
            const domain = '.sandbox.auth0-extend.com/';
            const affix = 'picturesofparker';
            return this.$axios
                .get(prefix + domain + affix)
                .then(response => {
                    this.success.api = true;
                    this.api = {
                        key: response.data.key,
                        user: response.data.user
                    };
                })
                .catch(error => {
                    this.success.api = false;
                    this.error.api = error;
                    console.error(error);
                });
        }
    }
};
</script>


<style lang="scss" scoped>
.try-again {
    @include display-flex(row-reverse nowrap, center, center);

    & span {
        margin-left: 0.5em;
    }

    &:hover, &:focus {
        text-decoration: none;
    }
}
</style>
