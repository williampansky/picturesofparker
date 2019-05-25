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
// import InfiniteLoading from 'vue-infinite-loading';
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
        // InfiniteLoading,
        Navbar,
        Offcanvas,
        Placeholder,
        Section,
        SwipeModal
    },

    data() {
        return {
            error: {
                api: null,
                images: null,
                tags: null
            },
            loaders: 20,
            override: false,
            infinitepage: 1,
            scroll: {
                lastScrollTop: 0,
                position: 0
            },
            showOffcanvas: false
        };
    },

    created() {
        this.$store.dispatch('getApiCredentials');
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.getPhotos();
        this.getTagsList();
    },

    updated() {
        if (this.credentials.key && this.credentials.user) {
            if (this.loading.credentials === true)
                this.$store.commit('updateLoadingState', 'credentials');
            if (this.success.credentials === false)
                this.$store.commit('updateSuccessState', 'credentials');

            if (this.photos.photo && this.photos.photo.length) {
                if (this.loading.api === true)
                    this.$store.commit('updateLoadingState', 'api');
                if (this.success.api === false)
                    this.$store.commit('updateSuccessState', 'api');
            }

            if (this.tagslist && this.tagslist.length) {
                if (this.loading.tags === true)
                    this.$store.commit('updateLoadingState', 'tags');
                if (this.success.tags === false)
                    this.$store.commit('updateSuccessState', 'tags');
            }
        }
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    computed: {
        ...mapGetters([
            'credentials',
            'errors',
            'loading',
            'photos',
            'success',
            'tagslist'
        ])
    },

    methods: {
        // https://stackoverflow.com/a/55391752
        // https://stackoverflow.com/a/31223774
        handleScroll(e) {
            this.scroll.position = e.target.documentElement.scrollTop;
            const height = window.innerHeight + this.scroll.position;
            const end = document.body.offsetHeight;

            // https://github.com/qeremy/so/blob/master/so.dom.js#L426
            var st = window.pageYOffset || document.documentElement.scrollTop;

            // get photos array.length and total photo count
            const length = this.photos.photo.length;
            const total = this.photos.total;

            if (st > this.scroll.lastScrollTop) {
                // downscroll code
                /**
                 * @bug currently, the scroll is very sensitive and will
                 * double load the query. gotta nip that shit.
                 */
                if ((height >= end) && (length <= total)) {
                    this.$store.dispatch('updatePhotos', {
                        'page': this.photos.page += 1
                    });
                }
            } else {
                // upscroll code
            }

            // For Mobile or negative scrolling
            this.scroll.lastScrollTop = st <= 0 ? 0 : st;
        },

        getPhotos() {
            if (this.photos && this.photos.photo && this.photos.photo.length)
                return;

            if (this.credentials && this.credentials.key && this.credentials.user) {
                this.$store.dispatch('getPhotos');
            } else {
                console.log('$vuex: retrying getPhotos...');
                setTimeout(() => {
                    this.getPhotos();
                }, 1000);
            }
        },

        getTagsList() {
            if (this.tagslist.data && this.tagslist.data.length) return;

            if (this.credentials.key && this.credentials.user) {
                this.$store.dispatch('getTagsList');
            } else {
                console.log('$vuex: retrying getTagsList...');
                setTimeout(() => {
                    this.getTagsList();
                }, 1000);
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
