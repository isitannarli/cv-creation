<template>
  <div id="app">
    <div id="cv">
      <div class="mainDetails">
        <div id="headshot">
          <div class="imgEditable" @click="imageUpload()">
            <span>Düzenle</span>
          </div>
          <input type="file" @change="onFileChange" ref="fileInput"/>
          <img :src="$root.image" />
        </div>
        <div id="name">
          <div class="basicInfoEditableButton" @click="editable('basicInfo')" v-if="!editable.basicInfo">Düzenle</div>
          <h1 v-if="!editable.basicInfo">{{ $root.cv.name }}</h1>
          <h2 v-if="!editable.basicInfo">{{ $root.cv.job_title }}</h2>
          <div class="basicInfoEditableContent" v-if="editable.basicInfo">
            <h1><input type="text" v-model="$root.cv.name" required></h1>
            <h2><input type="text" v-model="$root.cv.job_title" required></h2>
            <button @click="save('basicInfo')">Kaydet</button>
          </div>
        </div>
        <div id="contactDetails">
          <div class="socialInfoEditableButton" @click="editable('socialInfo')" v-if="!editable.socialInfo">Düzenle</div>
          <ul v-if="!editable.socialInfo">
            <li>e: {{ $root.cv.email }}</li>
            <li>w: {{ $root.cv.site }}</li>
            <li>m: {{ $root.cv.phone }}</li>
          </ul>
          <div class="socialInfoEditableContent" v-if="!editable.socialInfo">
            <li>
              <input type="text" v-model="$root.cv.email" required>
            </li>
            <li>
              <input type="text" v-model="$root.cv.site" required>
            </li>
            <li>
              <input type="text" v-model="$root.cv.phone" required>
            </li>
            <button @click="save('socialInfo')"></button>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div id="mainArea">
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

    </div>
    <div class="messageBox" v-if="$root.message.error.text" :class="$root.message.error.class">
      <span>{{ $root.message.error.text }}</span>
      <button class="closeMessageBox" @click="$root.closeBox()">x</button>
    </div>
    <div class="messageBox" v-if="$root.message.info.text" :class="$root.message.info.class">
      <span>{{ $root.message.info.text }}</span>
      <button class="closeMessageBox" @click="$root.closeBox()">x</button>
    </div>
    <div class="messageBox" v-if="$root.message.success.text" :class="$root.message.success.class">
      <span>{{ $root.message.success.text }}</span>
      <button class="closeMessageBox" @click="$root.closeBox()">x</button>
    </div>
    <div class="messageBox" v-if="$root.message.warning.text" :class="$root.message.warning.class">
      <span>{{ $root.message.warning.text }}</span>
      <button class="closeMessageBox" @click="$root.closeBox()">x</button>
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
          basicInfo: false,
          socialInfo: false,
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
          this.$root.saveFile();
        };
        reader.readAsDataURL(file);
      },
      contentEditable(name) {

        this.editable[name] = true;
      },
      save(name){
        this.editable[name] = false;

        this.$root.saveFile();
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
