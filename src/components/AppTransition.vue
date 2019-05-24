<template>
    <transition-group
    v-if="group"
    :tag="tag"
    :name="transition.name"
    :mode="transition.mode"
    :enter-class="transition.enter"
    :enter-active-class="transition.enter"
    :enter-to-class="transition.enter"
    :leave-class="transition.leave"
    :leave-active-class="transition.leave"
    :leave-to-class="transition.leave"
    :distance="distance"
    :speed="speed"
    :origin="origin"
    :originIn="originIn"
    :originOut="originOut">
        <slot></slot>
    </transition-group>

    <transition
    v-else
    :name="transition.name"
    :mode="transition.mode"
    :enter-class="transition.enter"
    :enter-active-class="transition.enter"
    :enter-to-class="transition.enter"
    :leave-class="transition.leave"
    :leave-active-class="transition.leave"
    :leave-to-class="transition.leave"
    :distance="distance"
    :speed="speed"
    :origin="origin"
    :originIn="originIn"
    :originOut="originOut">
        <slot></slot>
    </transition>
</template>


<script>
/**
 * @summary `<Transition />` element constructed to use UIkit's animation classes.
 *
 * @module Transition
 *
 * @see [UIkit]{@link https://getuikit.com/docs/animation}
 * @see [Docs]{@link https://vuejs.org/v2/guide/transitions.html}
 *
 * @prop {Boolean} group=false - Apply this boolean attr to use `transition-group`
 * @prop {String} tag=div - Optional, Wrapper elem for transition-groups
 * @prop {String} distance=null - Optional, Distance of animation. `small`, `medium`
 * @prop {String} id=null - Optional, ID of the component.
 * @prop {String} speed=null - Optional, Speed of animation.
 * `fast` = 100ms, `medium` = 250ms, `default/null` = 500ms
 * @prop {String} variation=fade - Variation of animation combinations;
 * `fade`, `up-down`, `down-up`, `left-right`, `right-left`, `scaleUp`, `scaleDown`
 *
 * @description
 * Using the `variation` prop, we can define our desired animations in the form
 * of `leave-enter`; such as: `up-down` will render enter=up & exit=down.
 *
 * Note that `uk-animation-reverse` is **required** for the exit animations
 * so that it fades-out instead of fading-in.
 *
 * For single-element transitions; use as such:
 *
 * ```html
<Transition
distance="small"
speed="fast"
variation="left-right">
    <span
    v-if="selectedProperty"
    :key="propertyName"
    class="display">
        {{ selectedProperty }}
    </span>
</Transition>
 *
 * Note the `:key` dynamic prop on the span element; this tells Vue to re-render
 * the component rather than simply replace the data. Re-rendering triggers the
 * animation to play out.
 *
 * Also note that for these to work correctly, elements apparently
 * must have a `display` CSS key:value definition; therefore, tags
 * like `<span />` must have a `display: inline-block` or `block`; etc.
 */


export default {
    name: 'AppTransition',

    data() {
        return {
            transition: {
                name: 'custom-classes-transition',
                mode: 'out-in',
                enter: null,
                leave: null,
            },
        };
    },

    props: {
        distance: {
            type: String,
            default: null
        },
        speed: {
            type: String,
            default: ''
        },
        origin: {
            type: String,
            default: ''
        },
        originIn: {
            type: String,
            default: ''
        },
        originOut: {
            type: String,
            default: ''
        },
        variation: {
            type: String,
            default: 'fade'
        },

        // transition-group only props
        group: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'div'
        },
    },

    computed: {
        handleDistance(distance) {
            distance = this.distance;
            let result;

            switch (distance) {
                case 'small':
                    result = '-small';
                    break;

                case 'medium':
                    result = '-medium';
                    break;

                default:
                    result = '';
                    break;
            }

            return result;
        },

        // WIP
        handleOrigin(origin, originOut, originIn) {
            if (this.origin) {
                origin = 'uk-transform-origin-' + this.origin;
                return origin;
            } else if (this.originOut && this.originIn) {
                originOut = 'uk-transform-origin-' + this.originOut;
                originIn = 'uk-transform-origin-' + this.originIn;
                return originOut + ' ' + originIn;
            } else if (this.originOut) {
                originOut = 'uk-transform-origin-' + this.originOut;
            } else if (this.originIn) {
                originIn = 'uk-transform-origin-' + this.originIn;
            }

            return null;
        }
    },

    created() {
        const variation = this.variation;
        const fade      = 'uk-animation-fade ';
        const up        = 'uk-animation-slide-top' + this.handleDistance + ' ';
        const right     = 'uk-animation-slide-right' + this.handleDistance + ' ';
        const down      = 'uk-animation-slide-bottom' + this.handleDistance + ' ';
        const left      = 'uk-animation-slide-left' + this.handleDistance + ' ';
        const scaleUp   = 'uk-animation-scale-up ';
        const scaleDown = 'uk-animation-scale-down ';
        const reverse   = 'uk-animation-reverse ';
        const speed     = 'uk-animation-' + this.speed;

        switch (variation) {
            case 'left-right':
                this.transition.leave = left + reverse + speed;
                this.transition.enter = right + speed;
                break;

            case 'left-left':
                this.transition.leave = left + reverse + speed;
                this.transition.enter = left + speed;
                break;

            case 'right-left':
                this.transition.leave = right + reverse + speed;
                this.transition.enter = left + speed;
                break;

            case 'right-right':
                this.transition.leave = right + reverse + speed;
                this.transition.enter = right + speed;
                break;

            case 'up-down':
                this.transition.leave = up + reverse + speed;
                this.transition.enter = down + speed;
                break;

            case 'up-up':
                this.transition.leave = up + reverse + speed;
                this.transition.enter = up + speed;
                break;

            case 'down-up':
                this.transition.leave = down + reverse + speed;
                this.transition.enter = up + speed;
                break;

            case 'down-down':
                this.transition.leave = down + reverse + speed;
                this.transition.enter = down + speed;
                break;

            case 'scaleUp':
                this.transition.leave = scaleDown + reverse + speed;
                this.transition.enter = scaleDown + speed;
                break;

            case 'scaleDown':
                this.transition.leave = scaleUp + reverse + speed;
                this.transition.enter = scaleUp + speed;
                break;

            default:
                this.transition.leave = fade + reverse + speed;
                this.transition.enter = fade + speed;
                break;
        }

        // console.log('leave: ' + this.transition.leave);
        // console.log('enter: ' + this.transition.enter);
    },
};
</script>
