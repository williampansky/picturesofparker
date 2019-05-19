<template>
    <footer
    class="footer uk-section uk-section-small uk-margin-small-bottom">
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
</template>


<script>
/**
 * @module Footer
 * @see [UIkit]{@link https://getuikit.com/docs/navbar}
 */
export default {
    name: 'Footer'
};
</script>


<style lang="scss" scoped>
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
