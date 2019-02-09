<template>
    <div>
        <div
        v-masonry
        gutter="10"
        transition-duration="0.3s"
        item-selector=".card">
            <AppCard
            v-for="(image, index) in images"
            :key="index"
            :src="image.src"
            :tags="image.tags"
            @click.native="openAppModal(image)" />
        </div>

        <AppModal
        :active="modal.active"
        :src="modal.src"
        :tags="modal.tags"
        @click.native="closeAppModal()" />
    </div>
</template>


<script>
/**
 * @module TheHome
 * @version 0.1.1
 * https://github.com/shershen08/vue-masonry
 * https://masonry.desandro.com/options.html
 */
import AppCard from '@/components/AppCard.vue';
import AppModal from '@/components/AppModal.vue';
export default {
    name: 'TheHome',

    components: {
        AppCard,
        AppModal
    },

    data() {
        return {
            images: [
                {
                    src: 'media/test-horizontal.jpg',
                    tags: [
                        { text: 'walkies' }
                    ]
                },
                {
                    src: 'media/test-vertical.jpg'
                }
            ],
            modal: {
                active: false,
                src: null,
                tags: []
            }
        };
    },

    methods: {
        openAppModal(value) {
            this.modal = {
                active: true,
                src: value.src,
                tags: value.tags
            };
        },

        closeAppModal() {
            this.modal = {
                active: false,
                src: null,
                tags: []
            };
        },
    }
};
</script>
