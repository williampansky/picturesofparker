<template>
    <main id="app">
        <Navbar />

        <Section v-show="loading.api && !errors.api">
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

        <Section v-if="!loading.api && success.api">
            <SwipeModal :images="photos.photo" />
        </Section>

        <Section v-else-if="errors.api">
            <Container class="uk-text-center">
                <ErrorMessage :message="error.api" />
                <p><a
                href="https://picturesofparker.com"
                uk-icon="icon: refresh;"
                class="try-again uk-icon">
                    <span>Reload page.</span>
                </a></p>
            </Container>
        </Section>

        <Section v-else-if="error.photos">
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

        <Section v-else-if="!loading.photos && errors.photos === null">
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
        :photos="photos"
        :tags="tagslist"
        @photos-clicked="getPhotosFromApi()"
        @tag-clicked="getPhotosFromApi('tag', $event)" />
    </main>
</template>


<script>
/**
 * @module App
 * @version 0.3.4
 */
import Container from '@/components/Container.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Footer from '@/components/Footer.vue';
import Grid from '@/components/Grid.vue';
import Navbar from '@/components/Navbar.vue';
import Offcanvas from '@/components/Offcanvas.vue';
import Placeholder from '@/components/Placeholder.vue';
import Section from '@/components/Section.vue';
import SwipeModal from '@/components/SwipeModal.vue';
import api from '@/mixins/api.js';
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    mixins: [api],
    components: {
        Container,
        ErrorMessage,
        Footer,
        Grid,
        Navbar,
        Offcanvas,
        Placeholder,
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
            loaders: 20,
            override: false,
            showOffcanvas: false
        };
    },

    created() {
        // this.getApiKey();
        this.$store.dispatch('getApiCredentials');
    },

    mounted() {
        this.getPhotos();
        this.getTagsList();
    },

    computed: {
        ...mapGetters([
            'credentials',
            'errors',
            'loading',
            'photos',
            'success',
            'tagslist'
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
        pingApi() {
            // grab photos from API,
            // if not set in localStorage
            setTimeout(() => {
                if (this.api.key && this.api.user) {
                    this.getPhotosFromApi();
                    this.getTagsList();
                } else {
                    this.error = {
                        api: 'Error obtaining API credentials',
                        images: null,
                        tags: null
                    };
                    this.loading = {
                        images: false,
                        tags: false
                    };
                    this.success = {
                        api: false,
                        images: false,
                        tags: false
                    };
                }
            }, 1200);
        },

        getPhotos() {
            if (
                this.photos && this.photos.length &&
                this.photos.photo && this.photos.photo.length
            ) return;

            if (this.credentials.key && this.credentials.user) {
                this.$store.dispatch('getPhotos');
            } else {
                console.log('$vuex: retrying getPhotos...');
                setTimeout(() => {
                    this.getPhotos();
                }, 1000);
            }
        },

        getTagsList() {
            if (this.tagslist && this.tagslist.length) return;

            if (this.credentials.key && this.credentials.user) {
                this.$store.dispatch('getTagsList');
            } else {
                console.log('$vuex: retrying getTagsList...');
                setTimeout(() => {
                    this.getTagsList();
                }, 1000);
            }
        },

        getPhotosFromApi(key, value, page = 1, timeout = 8000) {
            switch (key) {
                case 'tag':
                    if (page === 1) this.images = {};
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
                                page: page,
                                tags: value._content,
                                sort: 'date-taken-desc',
                                format: 'json',
                                nojsoncallback: 1,
                                timeout: timeout
                            }
                        })
                        .then(response => {
                            if (page !== 1) {
                                const data = response.data.photos.photo;
                                this.images.photo.push(data);
                            } else {
                                const data = response.data.photos;
                                this.images = data;
                            }

                            this.success.images = true;
                            setTimeout(() => {
                                this.loading.images = false;
                            }, 1200);
                        })
                        .catch(error => {
                            this.error.images = error.message;
                            this.success.images = false;
                            this.loading.images = false;
                            console.error(error);
                        });
                    break;

                default:
                    if (page === 1) this.images = {};
                    this.loading.images = true;
                    this.error.images = null;
                    this.success.images = false;
                    this.loaders = 20;

                    this.$axios
                        .get('?method=flickr.photos.search', {
                            params: {
                                api_key: this.api.key,
                                user_id: this.api.user,
                                extras: this.photoextras,
                                page: page,
                                sort: 'date-taken-desc',
                                format: 'json',
                                nojsoncallback: 1,
                                timeout: timeout
                            }
                        })
                        .then(response => {
                            if (page !== 1) {
                                const data = response.data.photos.photo;
                                this.images.photo.push(data);
                            } else {
                                const data = response.data.photos;
                                this.images = data;
                            }

                            this.success.images = true;
                            setTimeout(() => {
                                this.loading.images = false;
                            }, 1200);
                        })
                        .catch(error => {
                            this.error.images = error.message;
                            this.success.images = false;
                            this.loading.images = false;
                            console.error(error);
                        });
                    break;
            }
        }
    }
};
</script>


<style lang="scss">
// GLOBALS
// ========================================================================
// GLOBALS => html, body
html, body {
    cursor: default;
    background-color: $color-white;
    color: $base-font-color;
    // font-family: $base-font-family;
    // font-size: $base-font-size;
    // line-height: $base-font-line-height;
    // letter-spacing: $base-font-letter-spacing;
    // font-weight: $base-font-weight;
    // font-style: $base-font-style;

    @if $base-text-rendering == true {
        text-rendering: optimizeLegibility;
    }

    @if $base-font-smoothing == true {
        -webkit-font-smoothing: antialiased;
    }
}

body {
    @if $base-overflow-x-hidden == true {
        overflow-x: hidden;
    }
}


//_____________________________________
// TYPOGRAPHY => cursor:default
// Applies default cursor across the board for the following tags
// em,
// h1, h2, h3, h4, h5, h6,
// label,
// p, span, strong,
// th, td {
//     cursor: default;
// }


//_____________________________________
// TYPOGRAPHY => body copy
p:last-child,
p:last-of-type {
    margin-bottom: 0;
}


//_____________________________________
// TYPOGRAPHY => headings
h1, h2, h3, h4, h5, h6 {
    font-family: $font-condensed;
}


//_____________________________________
// GLOBALS => animations
// UIkit currently only has:
// default  = 500ms
// fast     = 100ms
// so adding a few more options to use in AppTransition.vue
/* stylelint-disable-next-line */
.uk-animation-medium { animation-duration: 250ms !important; }


//_____________________________________
// Error state refresh text + icon
.try-again {
    /* stylelint-disable-next-line */
    display: flex !important;
    @include display-flex(row-reverse nowrap, center, center);

    & span {
        margin-left: 0.5em;
    }

    &:hover, &:focus {
        text-decoration: none;
    }
}
</style>
