<template>
    <article class="uk-container uk-container-expand">
        <div
        class="
        uk-grid
        uk-grid-view
        uk-grid-small
        uk-grid-match
        uk-child-width-1-2
        uk-child-width-1-3@m
        uk-child-width-1-4@l
        uk-child-width-1-6@xl"
        uk-grid="masonry:true;"
        itemtype="http://schema.org/ImageGallery">
            <figure
            v-for="(item, index) in slides"
            :key="index"
            :data-pswp-index="index"
            :data-pswp-pid="item.pid"
            itemscope
            class="grid-item"
            itemprop="associatedMedia"
            itemtype="http://schema.org/ImageObject">
                <a
                :href="item.src"
                :data-size="'' + item.w + 'x' + item.h"
                itemprop="contentUrl"
                class="grid-item-link">
                    <img
                    :src="item.msrc"
                    :alt="item.alt"
                    itemprop="thumbnail"
                    class="grid-item-image" />
                </a>
                <figcaption
                style="display: none;"
                class="grid-item-caption uk-text-meta">
                    <div class="caption-title uk-animation-slide-bottom-small">
                        <span
                        itemprop="caption">{{ item.title }}</span>
                        <meta
                        :content="item.description"
                        name="description"
                        itemprop="description" />
                    </div>
                    <div class="flexr">
                        <div
                        v-if="item.datetaken"
                        class="uk-animation-slide-bottom-small"
                        style="animation-delay:200ms;">
                            <span>{{ item.dateTakenString }}</span>
                            <meta
                            :content="item.datetaken"
                            name="dateCreated"
                            itemprop="dateCreated" />
                            <meta
                            :content="item.dateupload"
                            name="datePublished"
                            itemprop="datePublished" />
                        </div>

                        <div
                        v-if="item.tags"
                        style="animation-delay:400ms;"
                        class="
                        caption-right
                        uk-text-meta
                        uk-animation-slide-bottom-small">
                            <span class="caption-tags">{{ item.tags }}</span>
                        </div>
                    </div>
                    <!-- <hr
                    v-if="item.tags"
                    style="animation-delay:200ms;"
                    class="
                    caption-hr
                    uk-hidden@m
                    uk-animation-fade" /> -->
                    <!-- <div
                    v-if="item.tags"
                    style="animation-delay:400ms;"
                    class="
                    caption-right
                    uk-text-meta
                    uk-animation-slide-bottom-small">
                        <span class="caption-tags">{{ item.tags }}</span>
                    </div> -->
                </figcaption>
            </figure>
        </div>


        <div
        class="pswp"
        tabindex="-1"
        role="dialog"
        aria-hidden="true">
            <div class="pswp__bg" />
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item" />
                    <div class="pswp__item" />
                    <div class="pswp__item" />
                </div>

                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar uk-animation-fade">
                        <div class="pswp__counter" />
                        <button
                        class="pswp__button pswp__button--close"
                        title="Close (Esc)" />
                        <button
                        class="pswp__button pswp__button--share"
                        title="Share" />
                        <button
                        class="pswp__button pswp__button--fs"
                        title="Toggle fullscreen" />
                        <button
                        class="pswp__button pswp__button--zoom"
                        title="Zoom in/out" />
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                    class="
                    pswp__share-modal
                    pswp__share-modal--hidden
                    pswp__single-tap">
                        <div class="pswp__share-tooltip" />
                    </div>

                    <button
                    class="pswp__button pswp__button--arrow--left"
                    title="Previous (arrow left)" />
                    <button
                    class="pswp__button pswp__button--arrow--right"
                    title="Next (arrow right)" />

                    <div class="pswp__caption">
                        <div class="pswp__caption__center" />
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>


<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';
</style>
