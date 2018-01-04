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
        <myList v-for="(title, index) in datas" :title="title" :parentKey="keyName" :index="index"></myList>
      </ul>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>

  import myArticle from './article.vue';

  import myList from './list.vue';

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
      myList
    },
    created() {
    }
  }
</script>

<style lang="sass">

</style>
