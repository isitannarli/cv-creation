<template>
  <div id="app" class="instaFade">
    <div class="mainDetails">
      <div id="headshot" class="quickFade">
        <img src="headshot.jpg" />
      </div>
      <div id="name">
        <h1 class="quickFade delayTwo">{{ cv.name }}</h1>
        <h2 class="quickFade delayThree">{{ cv.job_title }}</h2>
      </div>
      <div id="contactDetails" class="quickFade delayFour">
        <ul>
          <li>e: <a href="mailto:joe@bloggs.com" target="_blank">{{ cv.email }}</a></li>
          <li>w: <a href="http://www.bloggs.com">{{ cv.site }}</a></li>
          <li>m: {{ cv.phone }}</li>
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
            <p>{{ cv.summary }}</p>
          </div>
        </article>
        <div class="clear"></div>
      </section>
      <my-section :datas="cv.education" title="Eğitim Durumu" type="row"></my-section>
      <my-section :datas="cv.word_experience" title="İş Deneyimi" type="row"></my-section>
      <my-section :datas="cv.skills" title="Yetenekler" type="list"></my-section>
    </div>
  </div>
</template>
<script>

  import mySection from './components/section.vue';

  export default {
    name: 'app',
    data () {
      return {
        cv: state.cv,
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      mySection
    },
    created() {

    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  @import "./assets/style.css";
</style>
