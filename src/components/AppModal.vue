<template>
    <transition name="modal">
        <div
        :id="id"
        ref="modal"
        :class="[
            { 'uk-flex uk-flex-top': position === 'center' },
            { 'uk-modal-large': size === 'large' },
            { 'uk-modal-xlarge': size === 'xlarge' }
        ]"
        class="uk-modal uk-open"
        @click.prevent="$emit('close')">
            <article
            ref="dialog"
            :class="[
                { 'uk-margin-auto-vertical': position === 'center'  },
                { 'uk-margin-auto-vertical': position === null  },
                { 'uk-margin-auto-bottom': position === 'top'  },
                { 'uk-margin-auto-top': position === 'bottom'  }
            ]"
            class="uk-modal-dialog"
            >
                <button
                uk-close
                type="button"
                class="uk-modal-close-outside"
                @click="$emit('close')" />

                <header
                v-show="$slots.title || title"
                v-if="variation !== 'search-bar'"
                :class="{ 'uk-margin-remove': !$slots.subtitle || subtitle }"
                class="uk-modal-header uk-text-center">
                    <h1 class="uk-modal-title">
                        <slot
                        v-if="$slots.title"
                        name="title"></slot>
                        <template v-else>{{ title }}</template>
                    </h1>
                    <p
                    v-if="$slots.subtitle || subtitle"
                    class="modal-subtitle">
                        <slot
                        v-if="$slots.subtitle"
                        name="subtitle"></slot>
                        <template v-else>{{ subtitle }}</template>
                    </p>
                </header>

                <div
                v-show="$slots.body"
                class="uk-modal-body">
                    <slot name="body"></slot>
                </div>

                <div
                v-if="$slots.footer"
                class="uk-modal-footer">
                    <slot name="footer"></slot>
                </div>
            </article>
        </div>
    </transition>
</template>


<script>
/**
 * @summary Base modal component used throughout the app.
 *
 * @module AppModal
 * @exports components/modals/AppModal.vue
 *
 * @author William Pansky
 * @version 0.2.7
 * @phase 3.3
 *
 * @since 0.2.1 - Added back .uk-modal-page toggling
 * @since 0.2.3 - Can use prop="title/subtitle" or slots
 *
 * @see [getuikit.com/docs/modal]{@link https://getuikit.com/docs/modal}
 *
 * @requires AppButton
 * @requires AppIcon
 * @tutorial UIkit
 *
 * @prop {String} id=null - Id for the parent wrapper.
 * @prop {String} title=null - Modal header title.
 * @prop {String} subtitle=null - Modal sub-title; usually used for explanatory text.
 * @prop {String} variation=default - Variation type of the modal. `default`, `search-bar`
 * @prop {String} position=center - Position location of the modal. `center`, `top`, `bottom`
 *
 * @description
 * ```jsx
<AppModal v-if="errors.length"@close="closeModal">
    <template slot="title">
        Error
    </template>
    <template slot="subtitle">
        Sorry, there's been an error in the form submission.
    </template>
    <template slot="body">
        <p>Error message</p>
    </template>
</AppModal>
 * ```
 */

export default {
    name: 'AppModal',

    props: {
        // 'default' (inside modal) || 'outside'
        close: {
            type: String,
            default: 'default'
        },

        id: {
            type: [String, Number],
            default: null
        },

        title: {
            type: String,
            default: null
        },

        subtitle: {
            type: String,
            default: null
        },

        size: {
            type: String,
            default: null
        },

        variation: {
            type: String,
            default: 'default'
        },

        position: {
            type: String,
            default: 'center'
        },
    },

    created() {
        if (!document.body.classList.contains('uk-modal-page'))
            document.body.classList.add('uk-modal-page');
        else
            document.body.classList.remove('uk-modal-page');
    },

    mounted() {
        document.body.appendChild(this.$el);
    },

    destroyed() {
        const $el = this.$el;
        // If Vue didn't get to remove this element (because it was moved in the DOM)
        // Remove it manually
        setTimeout(() => {
            if ($el && $el.parentNode)
                $el.parentNode.removeChild($el);
        }, 300);

        if (!document.body.classList.contains('uk-modal-page'))
            document.body.classList.add('uk-modal-page');
        else
            document.body.classList.remove('uk-modal-page');
    },

    methods: {
        // /**
        //  * @method enter
        //  * @summary On the enter transition, Vue needs to know when the modal is shown and all
        //  * animations from UIkit are complete.
        //  */
        // enter(el, done) {
        //     document.body.appendChild(el);

        //     el.style.display = 'block';
        //     el.style.opacity = 1;
        //     el.classList.add('uk-open');

        //     el.querySelector('.uk-modal-dialog').style.opacity = 1;

        //     setTimeout(() => {
        //         done();
        //     }, 100);
        // },

        // /**
        //  * @method leave
        //  * @summary On the leave transition, Vue needs to know when the modal is completely hidden, after
        //  * UIkit's animations are complete.
        //  */
        // leave(el, done) {
        //     el.classList.remove('uk-open');
        //     el.style.display = 'none';
        //     el.style.opacity = '0';

        //     done();
        // },

        // /**
        //  * @method beforeLeave
        //  * @summary When Vue triggers the removal of the modal, it needs to communicate it to UIkit
        //  */
        // beforeLeave(el) {
        //     // UIkit.modal(el).hide();
        //     // this.$emit('close');
        // }
    }
};
</script>


<style lang="scss">
/* stylelint-disable */
// .modal-leave-active {
    // This is to wait for the uk-modal-dialog transition
    // transition-duration: 0.3s !important;
// }

.modal-enter,
.modal-leave-to {
    opacity: 0 !important;

    .uk-modal-dialog {
        opacity: 0;
        transform: translateY(-100px) !important;
    }
}

[data-browser-legacy='true'] {
    .modal-enter,
    .modal-leave-to {
        opacity: 1 !important;

        .uk-modal-dialog {
            opacity: 1;
            transform: translateY(0) !important;
        }
    }
}

// These are not scoped because this is a base component
.uk-modal {
    &.uk-open {
        opacity: 1;
        display: flex;

        .uk-modal-dialog {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .uk-modal-header,
    .uk-modal-footer { background: $color-white !important; }

    .uk-modal-header {
        border-top: 4px solid $color-primary;
        padding-top: 60px;
    }

    .uk-modal-footer { padding-bottom: 40px; }

    .uk-modal-title {
        font-size: 39px;
        line-height: 39px;
        letter-spacing: 0.49px;
    }

    &.search-bar-modal &-dialog {
        width: max-content;
    }
}


.uk-modal.uk-modal-xlarge {
    .uk-modal-body {
        padding: 100px;
    }
}


.modal-subtitle {
    cursor: default;
    font-size: 18px;
    line-height: 32px;
}

.uk-modal-close-outside {
    right: 0;
    transform: translate(100%, -100%);
}

.uk-modal-close-outside {
    top: 0;
    right: -5px;
    transform: translate(0, -100%);
    color: #fff;
}
/* stylelint-enable */
</style>


<style lang="scss">
.room-selection-modal {
    .uk-modal-dialog {
        width: 900px;
        max-width: 960px;
    }
}
</style>
