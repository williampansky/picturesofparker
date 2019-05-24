<template>
    <header
    uk-sticky="show-on-up: true;
    cls-active: uk-navbar-sticky;
    sel-target: .uk-navbar-container;
    animation: uk-animation-slide-top;">
        <nav
        uk-navbar
        class="uk-navbar uk-navbar-container uk-light uk-text-meta">
            <div class="uk-navbar-left">
                <a
                href="https://picturesofparker.com"
                class="uk-navbar-item menu">
                    <span>Pictures of Parker</span>
                </a>
            </div>
            <div class="uk-navbar-right">
                <AppTransition
                speed="medium"
                variation="fade">
                    <div :key="loading.tags">
                        <div
                        v-show="loading.tags && !errors.tags"
                        uk-spinner
                        class="uk-navbar-item" />
                        <a
                        v-show="!loading.tags && !errors.tags"
                        href="#"
                        uk-toggle="target: #offcanvas"
                        class="uk-navbar-item menu"
                        @click.prevent="$emit('menu-clicked')">
                            <span
                            class="uk-icon"
                            uk-icon="icon:hashtag;" />
                            <span>Tags</span>
                        </a>
                        <div
                        v-show="errors.tags"
                        class="uk-navbar-item menu">
                            <span>Error loading tags</span>
                        </div>
                    </div>
                </AppTransition>
            </div>
        </nav>
    </header>
</template>


<script>
/**
 * @module Navbar
 * @see [UIkit]{@link https://getuikit.com/docs/navbar}
 */
import AppTransition from '@/components/AppTransition.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'Navbar',
    components: { AppTransition },
    computed: {
        ...mapGetters([
            'errors',
            'loading',
            'success'
        ])
    }
};
</script>


<style lang="scss" scoped>
.menu {
    font-size: 0.875rem;
    line-height: 1;
    text-transform: lowercase;

    &:hover, &:focus {
        text-decoration: none;
    }
}

.uk-sticky .uk-navbar-container {
    background: linear-gradient(to left, #28a5f5, #1e87f0);
}

.uk-navbar-container {
    padding: 0;

    @include breakpoint('small') {
        padding: 0 15px;
    }

    @include breakpoint('medium') {
        padding: 0 25px;
    }
}
</style>


<style lang="scss">
.uk-navbar-right .uk-spinner svg {
    width: 20px;
}
</style>
