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
          <div class="basicInfoEditableButton" @click="contentEditable('basicInfo')" v-if="!editable.basicInfo">Düzenle</div>
          <h1 v-if="!editable.basicInfo">{{ $root.cv.name }}</h1>
          <h2 v-if="!editable.basicInfo">{{ $root.cv.job_title }}</h2>
          <div class="basicInfoEditableContent" v-if="editable.basicInfo">
            <h1><input type="text" v-model="$root.cv.name" required></h1>
            <h2><input type="text" v-model="$root.cv.job_title" required></h2>
            <button @click="save('basicInfo')">Kaydet</button>
          </div>
        </div>
        <div id="contactDetails">
          <div class="socialInfoEditableButton" @click="contentEditable('socialInfo')" v-if="!editable.socialInfo">Düzenle</div>
          <ul v-if="!editable.socialInfo">
            <li><i class="mdi mdi-email"></i> {{ $root.cv.email }}</li>
            <li><i class="mdi mdi-home-map-marker"></i> {{ $root.cv.address }}</li>
            <li><i class="mdi mdi-phone"></i> {{ $root.cv.phone }}</li>
          </ul>
          <ul class="socialInfoEditableContent" v-if="editable.socialInfo">
            <li>
              <span><i class="mdi mdi-email"></i> </span><input type="text" v-model="$root.cv.email" required>
            </li>
            <li>
              <span><i class="mdi mdi-home-map-marker"></i> </span><input type="text" v-model="$root.cv.address" required>
            </li>
            <li>
              <span><i class="mdi mdi-phone"></i> </span><input type="tel" v-model="$root.cv.phone" required>
            </li>
            <button @click="save('socialInfo')">Kaydet</button>
          </ul>
        </div>
        <div class="clear"></div>
      </div>
      <div id="mainArea">
        <section>
          <article>
            <div class="sectionTitle">
              <h1>Özet Bilgi</h1>
            </div>
            <div class="sectionContent" id="summary">
              <div class="summaryEditableButton" @click="contentEditable('summary')" v-if="!editable.summary">Düzenle</div>
              <p v-if="!editable.summary">{{ $root.cv.summary }}</p>
              <div class="summaryEditableContent" v-if="editable.summary">
                <textarea v-model="$root.cv.summary" required></textarea>
                <button @click="save('summary')">Kaydet</button>
              </div>
            </div>
          </article>
          <div class="clear"></div>
        </section>
        <my-section :datas="$root.cv.education" keyName="education" title="Eğitim Durumu" type="row"></my-section>
        <my-section :datas="$root.cv.word_experience" keyName="word_experience" title="İş Deneyimi" type="row"></my-section>
        <my-section :datas="$root.cv.skills" keyName="skills" title="Yetenekler" type="list"></my-section>
        <my-section :datas="$root.cv.language" keyName="language" title="Yabancı Dil" type="list"></my-section>
        <my-section :datas="$root.cv.referance" keyName="referance" title="Referanslar" type="list"></my-section>
      </div>
      <button class="printPage" type="button" @click="print()">Özgeçmişimi Yazdır/İndir</button>
    </div>
   <div class="copyright">ProKariyer.com</div>
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

  import html2pdf from './assets/html2pdf.bundle.min.js';

  // import jsPDF from 'jspdf/dist/jspdf.min.js';

  // const doc = new jsPDF();

  import "print-js/dist/print.min.js"

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
      },
      print() {

        document.body.id = 'printMode';

        let options = {
          margin:       0,
          filename:     `${this.$root.cv.name}.pdf`,
          image:        { type: 'jpeg', quality: 1 },
          html2canvas:  { dpi: 192, letterRendering: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        var element = document.getElementById('app');

        var pdf = new Promise(
          function (resolve, reject) {
            resolve(html2pdf(element, options));
          }
        );

        pdf.then(function() {
          document.body.id = '';
        })
        .catch(function() {
          document.body.id = '';
        });
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

  @import "~mdi/css/materialdesignicons.css";

  @import "./assets/style.css";
  @import "./assets/print.css";
</style>
