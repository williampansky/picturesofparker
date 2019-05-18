:class="$mq | mq({
    xs: childWidth(image.height_n, image.width_n),
    s: childWidth(image.height_n, image.width_n),
    m: '',
    l: '',
    xl: ''
})"

// https://www.npmjs.com/package/vue-swipe-actions

<!-- <section class="uk-container uk-container-expand">
    <AppGrid
    small
    match
    masonry>
        <div
        v-for="(image, index) in images"
        :key="index">
            <AppCard
            :tags="image.tags"
            :title="image.title"
            :src="constructPhotoUrl(image)"
            :imgwidth="Number(image.width_n)"
            :imgheight="Number(image.height_n)"
            @click.native="openAppModal(image, index)" />
        </div>
    </AppGrid>
</section> -->

<ImageModal
v-shortkey="{
    prev: ['arrowleft'],
    next: ['arrowright']
}"
v-if="modal.active"
:fullmodal="$mq | mq({
    xs: true,
    s:  true,
    m:  false,
    l:  false,
    xl: false
})"
:imageProp="modal.image"
:imgwidth="Number(modal.image.width_l)"
:imgheight="Number(modal.image.height_l)"
:imageSrc="constructPhotoUrl(modal.image)"
:apiKey="api.key"
variation="image"
close="default"
@close="closeAppModal()"
@shortkey.native="cycleCurrentPhoto($event, modal.index)" />


/**
* @see [stackoverflow]{@link https://stackoverflow.com/a/2498500}
*/
previous(number) {
    let index = this.images.indexOf(number);
    index--;
    if (index >= this.images.length) index = 0;
    // console.log(this.images[index]);
    return this.images[index];
},

next(number) {
    let index = this.images.indexOf(number);
    index++;
    if (index >= this.images.length) index = 0;
    // console.log(this.images[index]);
    return this.images[index];
},

/**
* @method childWidth
* Applies `uk-width-1-2` to vertical images.
*/
childWidth(height, width) {
    const h = Number(height);
    const w = Number(width);
    if (w < h) return 'uk-width-1-2';
},

openAppModal(value, idx) {
    this.modal = {
        active: true,
        image: value,
        index: idx,
        src: this.constructPhotoUrl(value),
        tags: value.tags
    };
},

closeAppModal() {
    this.modal = {
        active: false,
        image: null,
        index: null,
        src: null,
        tags: []
    };
},

constructPhotoUrl(value) {
    // https://farm{farm-id}.staticflickr.com/
    // {server-id}/{id}_{secret}.(jpg|gif|png)
    return 'https://farm' + value.farm +
        '.staticflickr.com/' + value.server +
        '/' + value.id + '_' + value.secret +
        '.jpg';
},

cycleCurrentPhoto(event, index) {
    console.log(event);
    /* eslint-disable */
    switch (event.srcKey) {
        case 'prev':
        this.$nextTick(() => {
            this.modal = {
                active: true,
                image: this.previous(this.match),
                index: index--,
                src: this.constructPhotoUrl(
                    this.previous(this.match)
                ),
                tags: this.previous(this.match).tags
            };
        });

        case 'next':
            this.$nextTick(() => {
                this.modal = {
                    active: true,
                    image: this.next(this.match),
                    index: index++,
                    src: this.constructPhotoUrl(
                        this.next(this.match)
                    ),
                    tags: this.next(this.match).tags
                };
            });
    }
}

match() {
    return this.images.find(img => img.id === this.modal.image.id);
},

firstImage() {
    return this.images[0];
}
