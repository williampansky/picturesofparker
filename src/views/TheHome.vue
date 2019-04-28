<template>
    <div>
        <AppGrid
        gutter
        masonry>
            <div
            v-for="(image, index) in images"
            :key="index">
                <AppCard
                :src="image.src"
                :tags="image.tags"
                @click.native="openAppModal(image)" />
            </div>
        </AppGrid>

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
 * @version 0.1.2
 */
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppModal from '@/components/AppModal.vue';

export default {
    name: 'TheHome',

    components: {
        AppCard,
        AppGrid,
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
