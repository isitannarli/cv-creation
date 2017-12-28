<template>
  <div id="app" class="instaFade">
    <div class="mainDetails">
      <div id="headshot" class="quickFade">
        <div class="imgEditable" @click="imageUpload()">
          <span>Düzenle</span>
        </div>
        <input type="file" @change="onFileChange" ref="fileInput"/>
        <img :src="$root.image" />
      </div>
      <div id="name">
        <h1 class="quickFade delayTwo">{{ $root.cv.name }}</h1>
        <h2 class="quickFade delayThree">{{ $root.cv.job_title }}</h2>
      </div>
      <div id="contactDetails" class="quickFade delayFour">
        <ul>
          <li>e: <a href="mailto:joe@bloggs.com" target="_blank">{{ $root.cv.email }}</a></li>
          <li>w: <a href="http://www.bloggs.com">{{ $root.cv.site }}</a></li>
          <li>m: {{ $root.cv.phone }}</li>
        </ul>
      </div>
      <div class="clear"></div>
    </div>
    <div id="mainArea" class="quickFade delayFive">
      <section>
        <article>
          <div class="sectionTitle">
            <h1>Kişisel Bilgilerim</h1>
          </div>
          <div class="sectionContent">
            <p>{{ $root.cv.summary }}</p>
          </div>
        </article>
        <div class="clear"></div>
      </section>
      <my-section :datas="$root.cv.education" keyName="education" title="Eğitim Durumu" type="row"></my-section>
      <my-section :datas="$root.cv.word_experience" keyName="word_experience" title="İş Deneyimi" type="row"></my-section>
      <my-section :datas="$root.cv.skills" keyName="skills" title="Yetenekler" type="list"></my-section>
    </div>
    <div class="appMenu">
      <button @click="saveFile()">Tarayıcıya Kayıtla</button>
    </div>
  </div>
</template>
<script>

  import mySection from './components/section.vue';



  export default {
    name: 'app',
    data () {
      return {
        editable: {
          image: false,
          name: false,
          job_title: false,
          social_infos: false,
          summary: false
        }
      }
    },
    components: {
      mySection
    },
    methods: {
      imageUpload() {
        this.$refs.fileInput.click();
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this.$root;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      saveFile() {
        localStorage.setItem("cv", JSON.stringify(this.$root.cv));
        localStorage.setItem("image", JSON.stringify(this.$root.image));
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {
    }
  }
</script>
<style lang="scss">
  @import "./assets/style.css";
</style>
