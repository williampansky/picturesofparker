<template>
    <transition name="modal">
        <div
        :id="id"
        ref="modal"
        :class="[
            { 'loading': loading },
            'image-' + dimension
        ]"
        class="
        uk-open
        uk-modal
        uk-padding-remove"
        @click="closeModal()">
            <article
            ref="dialog"
            :class="{ 'uk-animation-scale-up': !loading }"
            class="
            uk-modal-dialog
            uk-margin-auto-vertical"
            @click.stop>
                <button
                v-if="!loading"
                :class="close === 'outside'
                    ? 'uk-modal-close-outside'
                    : 'uk-modal-close-default'"
                uk-close
                type="button"
                class="
                uk-close
                uk-icon
                uk-animation-fade
                uk-modal-close-default"
                @click="closeModal()" />

                <div
                v-if="loading"
                uk-spinner />
                <div
                v-else-if="error !== null"
                class="uk-modal-body uk-background-default">
                    <p
                    class="
                    uk-text-lead
                    uk-text-error">{{ error }}</p>
                </div>
                <div
                v-else
                class="
                uk-modal-body
                uk-padding-remove">
                    <div
                    v-if="showTags"
                    class="tags uk-position-bottom-left uk-padding-small">
                        <ul class="uk-iconnav">
                            <li
                            v-for="(tag, i) in tags"
                            :key="i"
                            :style="'animation-delay:' + (i + 8) + '00ms;'"
                            :class="{ 'uk-animation-slide-bottom-small': !loading }">
                                <span
                                class="uk-label uk-box-shadow-small">{{
                                    tag._content
                                }}</span>
                            </li>
                        </ul>
                    </div>
                    <AppImage
                    v-if="sizesLoaded && imageLarge.source"
                    :src="imageLarge.source"
                    :height="imgheight"
                    :width="imgwidth"
                    class="uk-box-shadow-xlarge" />
                    <AppImage
                    v-else-if="sizesLoaded && imageLarge1600.source"
                    :src="imageLarge1600.source"
                    :height="imgheight"
                    :width="imgwidth"
                    class="uk-box-shadow-xlarge" />
                    <AppImage
                    v-else-if="sizesLoaded && imageOriginal.source"
                    :src="imageOriginal.source"
                    :height="imgheight"
                    :width="imgwidth"
                    class="uk-box-shadow-xlarge" />
                    <AppImage
                    v-else
                    :src="imageSrc"
                    :height="imgheight"
                    :width="imgwidth"
                    class="uk-box-shadow-xlarge" />
                </div>
            </article>
        </div>
    </transition>
</template>


<script>
/**
 * Extension of AppModal that targests displaying images.
 *
 * @module ImageModal
 * @exports components/ImageModal.vue
 * @extends components/AppModal.vue
 *
 * @author William Pansky
 * @version 0.1.1
 */
import AppImage from '@/components/AppImage.vue';
import AppModal from '@/components/AppModal.vue';
// import AppTag from '@/components/AppTag.vue';

export default {
    name: 'ImageModal',
    extends: AppModal,

    components: {
        AppImage
    },

    data() {
        return {
            count: 0,
            dimension: 'vertical',
            error: null,
            image: {
                height: null,
                label: null,
                loaded: false,
                source: null,
                width: null
            },
            loading: true,
            sizes: [{
                height: 0,
                label: '',
                media: 'photo',
                source: '',
                url: '',
                width: 0
            }],
            showTags: false,
            sizesLoaded: false,
            tags: []
        };
    },

    props: {
        imageProp: {
            type: Object,
            default: () => ({})
        },

        imageSrc: {
            type: String,
            default: ''
        },

        apiKey: {
            type: String,
            default: ''
        },

        imgheight: {
            type: Number,
            default: null
        },
        imgwidth: {
            type: Number,
            default: null
        },
    },

    created() {
        this.getImageSizes();
        this.getImageTags();
        this.getImageDimensions(
            Number(this.imageProp.height_l),
            Number(this.imageProp.width_l)
        );
    },

    computed: {
        imageLarge() {
            const result = this.sizes.find(size => size.label === 'Large');
            if (result) return result;
            else return null;
        },

        imageLarge1600() {
            const result = this.sizes.find(size => size.label === 'Large 1600');
            if (result) return result;
            else return null;
        },

        imageOriginal() {
            const result = this.sizes.find(size => size.label === 'Original');
            if (result) return result;
            else return null;
        }
    },

    methods: {
        imageLoaded(imgElement) {
            return imgElement.complete && imgElement.naturalHeight !== 0;
        },

        /**
         * Returns the available sizes for a photo.
         * The calling user must have permission to view the photo.
         * @method getImageSizes
         * @see [example]{@link https://www.flickr.com/photos/picturesofparker/47783772942/sizes/l/}
         */
        getImageSizes() {
            const endpoint = 'https://api.flickr.com/services/rest/?method=';
            const method = 'flickr.photos.getSizes';
            this.$axios
                .get(endpoint + method, {
                    params: {
                        api_key: this.apiKey,
                        photo_id: this.imageProp.id,
                        format: 'json',
                        nojsoncallback: 1
                    }
                })
                .then(response => {
                    const data = response.data.sizes.size;
                    this.sizes = data;
                    this.sizesLoaded = true;
                })
                .catch(error => {
                    this.error = error;
                    console.log(error);
                    this.sizesLoaded = true;
                });
        },

        getImageDimensions(height, width) {
            const h = Number(height);
            const w = Number(width);
            let dimension;

            if (w > h) dimension = 'horizontal';
            else dimension = 'vertical';
            this.dimension = dimension;
            this.loading = false;
        },

        getImageTags(photoId = this.imageProp.id) {
            const endpoint = 'https://api.flickr.com/services/rest/?method=';
            const method = 'flickr.tags.getListPhoto';
            this.$axios
                .get(endpoint + method, {
                    params: {
                        api_key: this.apiKey,
                        photo_id: this.imageProp.id,
                        format: 'json',
                        nojsoncallback: 1
                    }
                })
                .then(response => {
                    const data = response.data.photo.tags.tag;
                    this.tags = data;
                    if (data.length) this.showTags = true;
                })
                .catch(error => {
                    this.error = error;
                    console.log(error);
                });
        }
    }
};
</script>


<style lang="scss" scoped>
.uk-modal-dialog {
    background: none;
}

// .uk-modal-body {
//     max-height: 80vh;
//     max-width: 80vw;
// }

.loading {
    .uk-modal-dialog {
        background: none;
        margin: auto;
        width: auto;
    }

    .uk-spinner {
        color: white;
    }
}

.uk-close.uk-modal-close-default {
    animation-delay: 600ms;
    background: white;
    padding: 10px;
    right: 0;
    top: 0;
}

.tags {
    z-index: 1;
}

// .image {
//     &-horizontal img {
//         height: auto;
//         width: 80vw;
//     }

//     &-vertical img {
//         height: 80vh;
//         width: auto;
//     }
// }

.imageSrc {
    height: auto;
    width: 100%;
}

.uk-label {
    cursor: default;
}
</style>


<style lang="scss">
.image {
    &-horizontal figure,
    &-horizontal img {
        height: auto;
        width: 80vw;
    }

    &-vertical figure,
    &-vertical img {
        height: 80vh;
        width: auto;
    }
}
</style>
