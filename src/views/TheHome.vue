<template>
    <main>
        <div
        uk-sticky="
        sel-target: .uk-navbar-container;
        cls-active: uk-navbar-sticky;
        show-on-up: true;
        animation: uk-animation-slide-top;">
            <nav
            uk-navbar
            class="uk-navbar-container uk-light uk-text-meta">
                <div class="uk-navbar-left">
                    <!-- <ul class="uk-navbar-nav">
                        <li class="uk-active"><a href="#">Active</a></li>
                    </ul> -->
                    <a
                    href="#"
                    uk-toggle="target: #offcanvas-overlay"
                    class="uk-navbar-item uk-icon"
                    uk-icon="icon:menu;" />
                    <!-- <div class="uk-navbar-item">
                        <div>Some <a href="#">Link</a></div>
                    </div> -->
                </div>

                <div class="uk-navbar-right">
                    <a
                    href="#"
                    class="uk-navbar-item uk-icon"
                    uk-icon="icon:home;">
                        <!-- <span
                        class="uk-icon"
                         /> -->
                    </a>
                </div>
            </nav>
        </div>

        <div
        v-if="success.images"
        class="uk-section uk-section-small">
            <SwipeModal
            :images="images.photo" />
        </div>
        <div
        v-else-if="!error.images"
        class="uk-section uk-section-small">
            <div class="uk-container uk-container-expand">
                <div
                class="
                uk-grid
                uk-grid-small
                uk-grid-match
                uk-child-width-1-2
                uk-child-width-1-3@m
                uk-child-width-1-4@l
                uk-child-width-1-6@xl"
                uk-grid="masonry:true;">
                    <div
                    v-for="n in loaders"
                    :key="n">
                        <AppLoader />
                    </div>
                </div>
            </div>
        </div>
        <div
        v-else
        class="uk-section uk-section-small">
            <p>{{ error.images }}</p>
        </div>

        <footer class="footer uk-section uk-section-small">
            <nav
            uk-navbar
            class="
            uk-text-meta
            uk-container
            uk-container-expand
            uk-navbar-container
            uk-navbar-transparent">
                <div class="uk-navbar-left">
                    <span>Copyright ©</span>
                    <span>&nbsp;{{ new Date().getFullYear() }}&nbsp;</span>
                    <span>picturesofparker.com</span>
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-iconnav">
                        <li>
                            <a
                            target="_blank"
                            href="https://github.com/williampansky/picturesofparker"
                            rel="noopener noreferrer"
                            class="footer-link">
                                <span
                                class="uk-icon"
                                uk-icon="icon:github;" />
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            href="https://williampansky.com"
                            class="footer-link">
                                <span
                                class="uk-icon"
                                uk-icon="icon:user;" />
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            href="https://flickr.com/api"
                            rel="noopener noreferrer"
                            class="footer-link">
                                <span
                                class="uk-icon"
                                uk-icon="icon:flickr;" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </footer>

        <div
        id="offcanvas-overlay"
        uk-offcanvas="overlay:true;"
        class="uk-offcanvas">
            <div class="uk-offcanvas-bar">
                <button
                class="uk-offcanvas-close"
                type="button"
                uk-close />
                <p v-if="error.tags">{{ error.tags }}</p>
                <ul
                v-if="tags && tags.length"
                class="uk-nav">
                    <li class="uk-nav-header">Pictures of Parker</li>
                    <li>
                        <a
                        href="#"
                        class="offcanvas-link"
                        @click="getPhotosFromApi()">
                            <span>Photos ({{ getPhotos.total }})</span>
                        </a>
                    </li>
                    <!-- <li class="uk-nav-divider"></li> -->
                    <li class="uk-nav-header">Tags</li>
                    <li
                    v-for="(tag, idx) in tags"
                    :key="idx">
                        <a
                        href="#"
                        class="offcanvas-link"
                        @click="getPhotosFromApi('tag', tag)">
                            <span>{{ tag._content }} ({{ tag.count }})</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>


<script>
/**
 * @module TheHome
 * @version 0.2.0
 */
import AppLoader from '@/components/AppLoader.vue';
import SwipeModal from '@/components/SwipeModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'TheHome',

    components: {
        AppLoader,
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
            loaders: 20,
            success: {
                api: false,
                images: false,
                tags: false
            },
            images: {},
            override: false,
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
            // grab photos if not set in localStorage
            setTimeout(() => {
                if (this.api.key && this.api.user) {
                    const photoArray = this.getPhotos;

                    if (this.override === true) {
                        this.getPhotosFromApi();
                    } else if (photoArray && photoArray.length) {
                        this.images = this.getPhotos;
                        this.success.images = true;
                    } else {
                        this.getPhotosFromApi();
                    }

                    this.getTagsList();
                }
            }, 1200);
        },

        getPhotosFromApi(key, value) {
            /* eslint-disable */
            switch (key) {
                case 'tag':
                    this.images = {};
                    this.error.images = null;
                    this.success.images = false;
                    this.loaders = value.count;

                    this.$axios
                        .get('?method=flickr.photos.search', {
                            params: {
                                api_key: this.api.key,
                                user_id: this.api.user,
                                extras: this.photoextras,
                                tags: value._content,
                                format: 'json',
                                nojsoncallback: 1
                            }
                        })
                        .then(response => {
                            const data = response.data.photos;
                            this.images = data;
                            this.success.images = true;
                        })
                        .catch(error => {
                            this.error.images = error.message;
                            this.success.images = false;
                            console.log(error);
                        });
                    break;

                default:
                    this.images = {};
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
                                nojsoncallback: 1
                            }
                        })
                        .then(response => {
                            const data = response.data.photos;
                            this.images = data;
                            this.success.images = true;
                            this.commitPhotosToStore(data);
                        })
                        .catch(error => {
                            this.error.images = error.message;
                            this.success.images = false;
                            console.log(error);
                        });
                    break;
            }
            /* eslint-enable */
        },

        commitPhotosToStore(value) {
            this.$store.commit('setPhotos', value);
        },

        getTagsList() {
            this.$axios
                .get('?method=flickr.tags.getListUserPopular', {
                    params: {
                        api_key: this.api.key,
                        user_id: this.api.user,
                        format: 'json',
                        nojsoncallback: 1
                    }
                })
                .then(response => {
                    const data = response.data.who.tags.tag;
                    this.tags = data;
                    this.success.tags = true;
                })
                .catch(error => {
                    this.success.tags = false;
                    this.error.tags = error.message;
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
// main {
//     $gutter: 15px;
//     padding-top: $gutter;
//     padding-bottom: $gutter;

//     @include breakpoint('small') {
//         $gutter: 30px;
//         padding-top: $gutter;
//         padding-bottom: $gutter;
//     }

//     @include breakpoint('medium') {
//         $gutter: 40px;
//         padding-top: $gutter;
//         padding-bottom: $gutter;
//     }
// }
.uk-section-small {
    padding: 15px 0;

    @include breakpoint('small') {
        padding: 30px 0;
    }

    @include breakpoint('medium') {
        padding: 40px 0;
    }
}


.uk-sticky .uk-navbar-container {
    background: linear-gradient(to left, #28a5f5, #1e87f0);
}

.uk-nav-divider {
    border-top: 1px solid #e5e5e5;
}

.offcanvas-link {
    display: block;
}

.footer {
    .uk-navbar {
        @include display-flex(column nowrap, center, center);
        .uk-navbar-right { margin: 1em auto 0; }

        @include breakpoint('small') {
            @include display-flex(row nowrap, center, space-between);
            .uk-navbar-right { margin: 0 0 0 auto; }
        }
    }

    .footer-link {
        &:hover, &:focus {
            text-decoration: none;
        }
    }
}
</style>
