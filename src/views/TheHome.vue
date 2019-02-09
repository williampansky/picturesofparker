<template>
    <div
    v-masonry
    transition-duration="0.3s"
    item-selector=".card">
        <AppCard
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :tags="image.tags" />
    </div>
</template>


<script>
/**
 * @module TheHome
 * @version 0.1.0
 * https://masonry.desandro.com/options.html
 */

import AppCard from '@/components/AppCard.vue';
export default {
    name: 'TheHome',

    components: {
        AppCard
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
            ]
        };
    },
};
</script>
