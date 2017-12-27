<template>
  <div class="rowItem">
    <article v-if="!editable">
      <div class="editable" @click="edit(index)">
        <span>Düzenle</span>
      </div>
      <h2>{{ info.title }} @ {{ info.name }}</h2>
      <p class="subDetails"><span>{{ info.start_date.month }} {{ info.start_date.year }}</span> - <span v-if="!info.continues">{{ info.end_date.month }} {{ info.end_date.year }}</span><span v-if="info.continues">Devam Ediyor</span></p>
      <p>{{ info.description }}.</p>
    </article>
    <div class="newRow" v-if="!editable" @click="newItem(index)">
      <div class="line"></div>
      <div class="plus">+</div>
    </div>
    <div class="editable-content" v-if="editable">
      <h2><input type="text" v-model="info.title" required autofocus> @ <input type="text" v-model="info.name" required></h2>
      <p class="subDetails">
        <span>
          <select v-model="info.start_date.month">
            <option v-for="item in month" v-html="item"></option>
          </select>
          <input type="text" v-model="info.start_date.year" required>
        </span>
        <span> - </span>
        <span>
          <select v-model="info.end_date.month">
            <option v-for="item in month" v-html="item"></option>
          </select>
          <input type="text" v-model="info.end_date.year" required>
        </span>
        <span>
          <select v-model="info.continues" required>
            <option value="Devam Ediyor">Devam Ediyor</option>
            <option value="Bitirdim">Bitirdim</option>
          </select>
        </span>
      </p>
      <p><textarea type="text" v-model="info.description" required></textarea></p>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        editable: false,
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
        month: [
          "Ocak",
          "Şubat",
          "Mart",
          "Nisan",
          "Mayıs",
          "Haziran",
          "Temmuz",
          "Ağustos",
          "Eylül",
          "Ekim",
          "Kasım",
          "Aralık",
        ]
      }
    },
    props: ['info', 'index', 'parentKey'],
    methods: {
      newItem (index) {

        let parentKey = this.parentKey;

        let sectionArray = this.$root.cv[parentKey];
        sectionArray.splice(index + 1, 0, this.emptyData);
      },
      edit(index) {
        this.editable = !this.editable;
      }
    }
  }
</script>

<style lang="sass">

</style>
