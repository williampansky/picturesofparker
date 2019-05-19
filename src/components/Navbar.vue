<template>
    <div
    uk-sticky="show-on-up: true;
    cls-active: uk-navbar-sticky;
    sel-target: .uk-navbar-container;
    animation: uk-animation-slide-top;">
        <nav
        uk-navbar
        class="uk-navbar uk-navbar-container uk-light uk-text-meta">
            <div class="uk-navbar-left">
                <a
                href="#"
                uk-toggle="target: #offcanvas"
                class="uk-navbar-item menu"
                @click.prevent="$emit('menu-clicked')">
                    <span
                    class="uk-icon"
                    uk-icon="icon:hashtag;" />
                    <span>Tags</span>
                </a>
            </div>
        </nav>
    </div>
</template>


<script>
/**
 * @module Navbar
 * @see [UIkit]{@link https://getuikit.com/docs/navbar}
 */
export default {
    name: 'Navbar'
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
