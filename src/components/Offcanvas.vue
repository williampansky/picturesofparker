<template>
    <aside
    id="offcanvas"
    uk-offcanvas="overlay:true;"
    class="uk-offcanvas">
        <div class="uk-offcanvas-bar">
            <button
            class="uk-offcanvas-close"
            type="button"
            uk-close />

            <ul
            v-if="loading && !error"
            class="uk-nav">
                <li class="uk-nav-header">Pictures of Parker</li>
                <li><a
                href="#"
                class="link uk-animation-fade">
                    <Placeholder type="text-item-dark" />
                </a></li>
                <li class="uk-nav-header">Tags</li>
                <li
                v-for="(n, i) in 15"
                :key="i"><a
                :style="'animation-delay:' + i + '00ms;'"
                href="#"
                class="link uk-animation-slide-left-small">
                    <Placeholder type="text-item-dark" />
                </a></li>
            </ul>

            <ErrorMessage
            v-else-if="error"
            :message="error" />

            <ul
            v-else-if="tags && tags.length"
            class="uk-nav">
                <li class="uk-nav-header">Pictures of Parker</li>
                <li><a
                href="#"
                uk-toggle="#offcanvas"
                class="link uk-animation-fade"
                @click.prevent="$emit('photos-clicked')">
                    <span>Photos ({{ photos.total }})</span>
                </a></li>
                <li class="uk-nav-header">Tags</li>
                <li
                v-for="(tag, idx) in tags"
                :key="idx"><a
                :style="'animation-delay:' + idx + '00ms;'"
                href="#"
                uk-toggle="#offcanvas"
                class="link uk-animation-slide-left-small"
                @click.prevent="$emit('tag-clicked', tag)">
                    <span>{{ tag._content }} ({{ tag.count }})</span>
                </a></li>
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
export default {
    name: 'Offcanvas',
    props: {
        error: { type: String, default: null },
        loading: { type: Boolean, default: true },
        photos: { type: Object, default: () => ({}) },
        tags: { type: Array, default: () => ([]) }
    },
    components: {
        ErrorMessage,
        Placeholder
    }
};
</script>


<style lang="scss" scoped>
.link {
    &:hover, &:focus {
        opacity: 0.675;
    }
}
</style>
