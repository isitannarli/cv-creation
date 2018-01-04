<template>
  <div class="rowItem">
    <article v-if="!editable">
      <div class="editable" @click="edit(index)">
        <span>Düzenle</span>
      </div>
      <div class="removeItem" @click="removeItem(index)">
        <span>Sil</span>
      </div>
      <h2>{{ info.title }} @ {{ info.name }}</h2>
      <p class="subDetails"><span>{{ info.start_date.month }} {{ info.start_date.year }}</span> - <span v-if="info.continues == 'false'">{{ info.end_date.month }} {{ info.end_date.year }}</span><span v-if="info.continues == 'true'">Devam Ediyor</span></p>
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
          <select v-model="info.start_date.year">
            <option v-for="item in years" v-html="item"></option>
          </select>
        </span>
        <span v-if="info.continues == 'false'"> - </span>
        <span v-if="info.continues == 'false'">
          <select v-model="info.end_date.month">
            <option v-for="item in month" v-html="item"></option>
          </select>
          <select v-model="info.end_date.year">
            <option v-for="item in years" v-html="item"></option>
          </select>
        </span>
        <span> ----- </span>
        <span>
          <select v-model="info.continues" required>
            <option value="true">Devam Ediyor</option>
            <option value="false">Bitirdim</option>
          </select>
        </span>
      </p>
      <p><textarea type="text" v-model="info.description" required></textarea></p>
      <button @click="save(index)">Kaydet</button>
      <button @click="cancel(index)">İptal Et</button>
    </div>
  </div>
</template>

<script>

  import vm from '../main.js'

  export default {
    name: 'article',
    data() {
      return {
        editable: false,
        emptyData: {
          title: "Başlık",
          name: "Ad",
          start_date: {
            month: "Ocak",
            year: "2007"
          },
          end_date: {
            month: "Ağustos",
            year: "2009"
          },
          continues: "true",
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
        ],
        years: []
      }
    },
    props: ['info', 'index', 'parentKey'],
    methods: {
      newItem (index) {

        let parentKey = this.parentKey;

        let sectionArray = this.$root.cv[parentKey];
        sectionArray.splice(index + 1, 0, this.emptyData);

        this.$root.saveFile();
      },
      removeItem(index) {
        let parentKey = this.parentKey;

        let sectionArray = this.$root.cv[parentKey];

        if(sectionArray.length == 1) {
          this.$root.alert('info', 'En Az 1 İçerik Kalmak Zorundadır!');
          return false;
        } else {
          sectionArray.splice(index, 1);
          this.$root.saveFile();

          this.$root.alert('success', 'İçerik Başarıyla Silindi');
        }
      },
      edit(index, e) {

        this.editable = true;

      },
      save(index) {
        this.editable = false;

        this.$root.saveFile();
      },
      cancel(index) {

        let parentKey = this.parentKey;

        let getCv = JSON.parse(localStorage.cv);

        this.$root.cv[parentKey] = getCv[parentKey];

        this.editable = false;
      }
    },
    created() {


    },
    mounted() {
      var date = new Date();
      var year = date.getFullYear();

      for(var i = year; i >= 1920; i--) {
        this.years.push(i);
      }
    }
  }
</script>

<style lang="sass">

</style>
