<template>
  <section>
    <div class="sectionTitle">
      <h1>{{ title }}</h1>
    </div>
    <div class="sectionContent" v-if="type == 'row'">
      <my-article v-for="(row, index) in datas" :info="row" :parentKey="keyName" :index="index"></my-article>
    </div>
    <div class="sectionContent" v-if="type == 'list'">
      <ul class="keySkills">
        <mySkill v-for="(title, index) in datas" :title="title" :index="index"></mySkill>
      </ul>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>

  import myArticle from './article.vue';

  import mySkill from './skill.vue';

  export default {
    name: 'section',
    data() {
      return {

      }
    },
    props: ['datas', 'title', 'type', 'keyName'],
    methods: {

    },
    components: {
      myArticle,
      mySkill
    },
    created() {
    }
  }
</script>

<style lang="sass">

</style>
