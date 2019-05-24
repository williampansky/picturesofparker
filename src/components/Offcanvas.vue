<template>
    <aside
    id="offcanvas"
    uk-offcanvas="overlay:true; flip:true;"
    class="uk-offcanvas">
        <div class="uk-offcanvas-bar">
            <button
            class="uk-offcanvas-close"
            type="button"
            uk-close />

            <ul
            v-if="loading.tags && !errors.tags"
            class="uk-nav">
                <li class="uk-nav-header">Pictures of Parker</li>
                <li><a
                href="#"
                class="link uk-animation-fade">
                    <Placeholder type="text-item-dark" />
                </a></li>
                <li class="uk-nav-header">Tags</li>
                <li
                v-for="(n, i) in 10"
                :key="i"><a
                :style="`animation-delay: ${i * 50}ms;`"
                href="#"
                class="link uk-animation-slide-left-small">
                    <Placeholder type="text-item-dark" />
                </a></li>
            </ul>

            <ErrorMessage
            v-else-if="errors.tags"
            :message="errors.tags" />

            <ul
            v-else-if="tags && tags.length"
            class="uk-nav">
                <li class="uk-nav-header">Pictures of Parker</li>
                <li><a
                href="#"
                uk-toggle="#offcanvas"
                class="link uk-animation-fade"
                @click.prevent="$emit('photos-clicked')">
                    <span>All Photos ({{ photos.total }})</span>
                </a></li>
                <li class="uk-nav-header">Tags</li>
                <ul
                :class="cloud ? 'tagcloud' : ''"
                class="uk-nav">
                    <li
                    v-for="(tag, idx) in tags"
                    :key="idx">
                        <a
                        v-if="cloud"
                        :style="`animation-delay: ${idx}00ms;
                        font-size: calc(0.675em + ${tag.count}px);`"
                        :class="tag.count >= 25 ? 'max-font-size' : ''"
                        href="#"
                        uk-toggle="#offcanvas"
                        class="link uk-animation-slide-bottom-small"
                        @click.prevent="$emit('tag-clicked', tag)">
                            <span>{{ tag._content }} ({{ tag.count }})</span>
                        </a>
                        <a
                        v-else
                        :style="`animation-delay: ${idx}00ms;`"
                        href="#"
                        uk-toggle="#offcanvas"
                        class="link uk-animation-slide-right-small"
                        @click.prevent="$emit('tag-clicked', tag)">
                            <span>{{ tag._content }} ({{ tag.count }})</span>
                        </a>
                    </li>
                </ul>
            </ul>
        </div>
    </aside>
</template>


<script>
/**
 * @module Offcanvas
 * @see [UIkit]{@link https://getuikit.com/docs/offcanvas}
 */
import ErrorMessage from '@/components/ErrorMessage.vue';
import Placeholder from '@/components/Placeholder.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'Offcanvas',
    data() {
        return {
            cloud: true
        };
    },
    props: {
        photos: { type: Object, default: () => ({}) },
        tags: { type: Array, default: () => ([]) }
    },
    components: {
        ErrorMessage,
        Placeholder
    },
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
.uk-offcanvas-overlay::before {
    background: rgba(0, 0, 0, 0.465);
}

.link {
    font-size: 0.875em;
    letter-spacing: 0.03em;
    span { transition: 200ms ease-in-out; }
    &:hover, &:focus { span { opacity: 0.625; } }
}

.tagcloud {
    margin-left: -10px;

    li {
        display: inline-block;
    }

    a {
        padding: 5px 10px;
    }

    .max-font-size {
        /* stylelint-disable */
        font-size: 26px !important;
    }

    span {
        pointer-events: none;
    }
}
</style>
