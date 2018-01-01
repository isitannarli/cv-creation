  <template>
  <li class="skillItem" >
    <div class="skillEditableButton" v-if="!editableSkill" @click="editable(index)">Düzenle</div>
    <span v-if="!editableSkill">{{ $root.cv.skills[index] }}</span>
    <div class="editableSkillContent" v-if="editableSkill">
      <input type="text" v-model="$root.cv.skills[index]" required>
      <button @click="save(index)">Kaydet</button>
    </div>
    <div class="skillTools" v-if="!editableSkill">
      <button class="addSkill" @click="addSkill(index)">Ekle</button>
      <button class="removeSkill" @click="removeSkill(index)">Sil</button>
    </div>
  </li>
</template>


<script>
  export default {
    name: 'skill',
    data() {
      return {
        emptyData: 'Yeni Yetenek',
        editableSkill: false,
      }
    },
    props: ['title', 'index'],
    methods: {
      addSkill(index) {
        this.$root.cv.skills.splice(index + 1, 0, this.emptyData);

        this.$root.saveFile();
      },
      removeSkill(index) {
        if(this.$root.cv.skills.length == 1) {
          this.$root.alert('info', 'En Az 1 Yetenek Kalmak Zorundadır!');
          return false;
        } else {
          this.$root.cv.skills.splice(index, 1);
          this.$root.saveFile();

          this.$root.alert('info', 'Yetenek Silindi.');
        }
      },
      editable(index) {
        this.editableSkill = true;
      },
      save(index) {

        this.$root.saveFile();

        this.editableSkill = false;
      }
    }
  }
</script>

<style>

</style>
