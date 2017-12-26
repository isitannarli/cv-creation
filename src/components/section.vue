<template>
  <section>
    <div class="sectionTitle">
      <h1>Education</h1>
    </div>
    <div class="sectionContent" v-if="type == 'article'">
      <article>
        <h2>College/University</h2>
        <p class="subDetails">Qualification</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies massa et erat luctus hendrerit. Curabitur non consequat enim.</p>
      </article>
    </div>
    <div class="sectionContent" v-if="type == 'list'">
      <ul class="keySkills">
        <li>A Key Skill</li>
        <li>A Key Skill</li>
        <li>A Key Skill</li>
        <li>A Key Skill</li>
        <li>A Key Skill</li>
        <li>A Key Skill</li>
        <li>A Key Skill</li>
        <li>A Key Skill</li>
      </ul>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>
  export default {
    name: 'section',
    data() {
      return {

      }
    },
    props: ['data', 'type'],
    methods: {

    },
    components:
  }
</script>

<style lang="sass">

</style>
