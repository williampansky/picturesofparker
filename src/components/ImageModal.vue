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
                <!-- :class="close === 'outside'
                    ? 'uk-modal-close-outside'
                    : 'uk-modal-close-default'" -->
                <button
                v-if="!loading"
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
                class="uk-modal-body">
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
                    <AppImage
                    :src="imageLarge.source"
                    preload
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
 * @version 0.0.8
 */
import AppImage from '@/components/AppImage.vue';
import AppModal from '@/components/AppModal.vue';

export default {
    name: 'ImageModal',
    extends: AppModal,
    components: { AppImage },

    data() {
        return {
            dimension: 'vertical',
            error: null,
            loading: true,
            sizes: [{
                height: 0,
                label: '',
                media: 'photo',
                source: '',
                url: '',
                width: 0
            }]
        };
    },

    props: {
        imageProp: {
            type: Object,
            default: () => ({})
        },

        apiKey: {
            type: String,
            default: ''
        }
    },

    created() {
        this.getImageSizes();
    },

    mounted() {
        let count = 0;
        let interval = setInterval(() => {
            if (count < 20) {
                if (this.imageLarge !== null) {
                    this.getImageDimensions(
                        this.imageLarge.height,
                        this.imageLarge.width
                    );

                    setTimeout(() => {
                        this.loading = false;
                        clearInterval(interval);
                    }, 400);
                }

                count++;
            } else {
                this.error = 'Error loading image.';
                this.loading = false;
                clearInterval(interval);
            }
        }, 100);
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
                })
                .catch(error => {
                    this.error = error;
                    console.log(error);
                });
        },

        getImageDimensions(height, width) {
            const h = Number(height);
            const w = Number(width);
            let dimension;

            if (w > h) dimension = 'horizontal';
            else dimension = 'vertical';
            this.dimension = dimension;
        }
    }
};
</script>


<style lang="scss" scoped>
.uk-modal-dialog {
    background: none;
}

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

.uk-close {
    background: white;
    padding: 10px;
    right: 0;
    top: 0;
}

.image {
    &-horizontal img {
        height: auto;
        width: 90vw;
    }

    &-vertical img {
        height: 90vh;
        width: auto;
    }
}
</style>
