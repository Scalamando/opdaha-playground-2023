<script>
  export default {
    data () {
      return {
        value: [45, 65],
        rating: 3,
      }
    },
    methods: {
      processTrackLabel (value, order) {
        return order === 0
          ? `${value}$`
          : `${value}$`
      },
    },
  }
</script>

<template>
  <p>Buttongroup</p>
 <va-button-group>
    <va-button>One</va-button>
    <va-button>Two</va-button>
    <va-button>Three</va-button>
  </va-button-group>

  <p>chips</p>
  <va-chip>default</va-chip>

  <p>single slider</p>
  <va-slider class="mb-4"
    v-model="value[0]"
    track-label-visible
  />

  <p>double slider</p>
  <va-slider class="mb-4"
    v-model="value"
    range
    track-label-visible
    :track-label="processTrackLabel"
  />

  <p>rating</p>
  <va-rating v-model="rating"/>

  <p></p>
</template>