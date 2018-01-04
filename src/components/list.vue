  <template>
  <li class="skillItem" >
    <div class="skillEditableButton" v-if="!editableSkill" @click="editable(index)">Düzenle</div>
    <span v-if="!editableSkill">{{ $root.cv[parentKey][index] }}</span>
    <div class="editableSkillContent" v-if="editableSkill">
      <input type="text" v-model="$root.cv[parentKey][index]" required>
      <button @click="save(index)">Kaydet</button>
    </div>
    <div class="skillTools" v-if="!editableSkill">
      <button class="addSkill" @click="add(index)">Ekle</button>
      <button class="removeSkill" @click="remove(index)">Sil</button>
    </div>
  </li>
</template>


<script>
  export default {
    name: 'list',
    data() {
      return {
        emptyData: 'Yeni Ekle',
        editableSkill: false,
      }
    },
    props: ['title', 'index', 'parentKey'],
    methods: {
      add(index) {
        this.$root.cv[this.parentKey].splice(index + 1, 0, this.emptyData);

        this.$root.saveFile();
      },
      remove(index) {
        if(this.$root.cv[this.parentKey].length == 1) {
          this.$root.alert('info', 'En Az 1 İçerik Kalmak Zorundadır!');
          return false;
        } else {
          this.$root.cv[this.parentKey].splice(index, 1);
          this.$root.saveFile();

          this.$root.alert('info', 'İçerik Silindi.');
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
