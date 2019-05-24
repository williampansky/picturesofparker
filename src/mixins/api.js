export default {
    data() {
        return {
            /**
             * @see [docs]{@link https://www.flickr.com/services/api/flickr.photos.search.htm}
             */
            methods: {
                getPhotos: 'flickr.people.getPhotos',
                search: 'flickr.photos.search',
                tags: 'flickr.tags.getListUserPopular'
            }
        };
    },

    computed: {
        photoextras() {
            return [
                'description',
                'date_upload',
                'date_taken',
                'sizes',
                'tags',
                'url_h', // Large 1600 (1600 x 900)
                'url_l', // Large 1024 (1024 x 576)
                'url_m', // Medium 500 (500 x 281)
                'url_n', // Small 320 (320 x 180)
                'url_o', // Original (3840 x 2160)
                'url_q', // Square 150 (150 x 150)
                'url_t', // Thumbnail (100 x 56)
                'views'
            ].toString();
        }
    },

    methods: {
        getPhotos(options) {
            this.apiRequest('getPhotos', options);
        },

        getMethodString(key) {
            switch (key) {
                case 'getPhotos': return '?method=' + this.methods.getPhotos;
                case 'search': return '?method=' + this.methods.search;
                case 'tags': return '?method=' + this.methods.tags;
                default: return this.methods.getPhotos;
            }
        },

        apiRequest(method, options, timeout = 8000) {
            if (options && !options.page) this.images = {};
            this.loading.images = true;
            this.error.images = null;
            this.success.images = false;
            this.loaders = 20;

            this.$axios
                .get(this.getMethodString(method), {
                    params: {
                        api_key: this.api.key,
                        user_id: this.api.user,
                        extras: options && options.extras
                            ? options && options.extras
                            : this.photoextras,
                        page: options && options.page
                            ? options && options.page
                            : 1,
                        sort: options && options.sort
                            ? options && options.sort
                            : 'date-taken-desc',
                        format: 'json',
                        nojsoncallback: 1,
                        timeout: timeout
                    }
                })
                .then(response => {
                    this.handleApiResponse(response.data.photos);
                    this.images = response.data.photos;
                    this.success.images = true;
                    setTimeout(() => {
                        this.loading.images = false;
                    }, 1200);
                })
                .catch(error => {
                    this.error.images = error.message;
                    this.success.images = false;
                    this.loading.images = false;
                    console.error(error);
                });
        },

        handleApiResponse(data) {
            this.$emit('api-success', true);
            this.$emit('', true);
            return data;
        },

        getApiKey(value) {
            const prefix = 'https://wt-30c7730f9ad0ef866a5444aa1e3835dc-0';
            const domain = '.sandbox.auth0-extend.com/';
            const affix = 'picturesofparker';
            return this.$axios
                .get(prefix + domain + affix)
                .then(response => {
                    this.success.api = true;
                    this.api = {
                        key: response.data.key,
                        user: response.data.user
                    };
                })
                .catch(error => {
                    this.success.api = false;
                    this.error.api = error;
                    console.error(error);
                });
        }
    }
};
