<template>
    <article
    class="
    uk-card
    uk-card-default
    uk-card-small">
        <header class="uk-card-media-top">
            <AppImage
            :alt="title"
            :src="src"
            :height="Number(imgheight)"
            :width="Number(imgwidth)" />
        </header>
        <div
        v-if="displayTitle"
        class="uk-card-body">
            <h1
            class="
            uk-card-title
            uk-text-truncate">{{ title }}</h1>
        </div>
        <!-- <footer
        v-if="tags"
        class="uk-card-footer">
            <span class="uk-text-meta">{{ tags }}</span>
        </footer> -->
        <!-- <header
        :style="'background-image: url(' + src + ');'"
        class="uk-background-cover uk-card-media-top" /> -->
    </article>
</template>


<script>
import AppImage from '@/components/AppImage.vue';
// import AppTag from '@/components/AppTag.vue';

export default {
    name: 'AppCard',
    components: {
        AppImage,
        // AppTag
    },
    data() {
        return {
            max: false
        };
    },
    props: {
        src: { type: String, default: '' },
        // tags: { type: Array, default: () => ([]) },
        tags: { type: String },
        title: { type: String, default: '' },
        imgheight: { type: Number, default: null },
        imgwidth: { type: Number, default: null },
    },
    computed: {
        displayTitle() {
            if (this.stringIsWrittenTitle(this.title) === true) return true;
            return false;
        },
        // computedTitle() {
        //     this.title ?
        // }
    },
    methods: {
        /**
         * Checks to see if the value parameter contains a string of
         * numbers or not — in order to differentiate between a
         * written image title and a device generated one.
         * @method checkTitleString
         */
        stringIsWrittenTitle(value) {
            // const regex = /^-?\d+\.?\d*$/g;
            const regex = /[^\d]\d+/g;
            if (value.match(regex)) return false;
            else return true;
        }
    }
};
</script>


<style lang="scss" scoped>
/* stylelint-disable */
article {
    background: #fff;
    border-radius: 0.25rem;
    border-radius: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0675),
        0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: none;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1);

    header {
        box-sizing: border-box;
        max-width: none;
        max-height: none;
        object-fit: cover;
        overflow: hidden;
        position: relative;

        &:before {
            content: '';
            background: rgba(255, 255, 255, 0);
            pointer-events: none;
            transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1);
            @include position-absolute(0, 0, 0, 0);
        }
    }

    h1 {
        font-size: 0.875em;
    }

    // .uk-background-cover {
    //     height: 250px;
    //     max-width: none;
    //     width: auto;
    // }

    .uk-card-body {
        padding: 4px 0;
    }

    img {
        box-sizing: border-box;
        height: auto;
        max-width: 100%;
        width: 100%;
        vertical-align: middle;
    }

    footer {
        display: none;
        box-sizing: border-box;
        @include position-absolute(auto, auto, 10px, 5px);
    }

    &:hover,
    &:focus {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.12);
        box-shadow: none;

        header:before {
            background: rgba(255, 255, 255, 0.365);
            z-index: 1;
        }
    }
}
</style>
