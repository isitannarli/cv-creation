<template>
  <div class="rowItem">
    <article>
      <h2>{{ info.title }} @ {{ info.name }}</h2>
      <p class="subDetails"><span>{{ info.start_date.month }} {{ info.start_date.year }}</span> - <span v-if="!info.continues">{{ info.end_date.month }} {{ info.end_date.year }}</span><span v-if="info.continues">Devam Ediyor</span></p>
      <p>{{ info.description }}.</p>
    </article>
    <div class="newRow" @click="newItem(index)">
      <div class="line"></div>
      <div class="plus">+</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        emptyData: {
          title: "İş Unvanınız",
          name: "Şirket Adı",
          start_date: {
            month: "Ocak",
            year: "2007"
          },
          end_date: {
            month: "",
            year: ""
          },
          continues: true,
          description: "Detay Bilgisini Buraya Yazınız.."
        },
      }
    },
    props: ['info', 'index'],
    methods: {
      newItem: function(index) {
        let array = this.info;
        // array.splice(index, 0, this.emptyData);
        array.push(this.emptyData);
      }
    }
  }
</script>

<style lang="sass">

</style>
