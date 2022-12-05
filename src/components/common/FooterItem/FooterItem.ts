import { defineComponent } from 'vue';

import ShareSheet from '../ShareSheet/ShareSheet.vue';
import json from '@/assets/data/data.json';

export default defineComponent({
  name: 'FooterItem',
  components: {
    ShareSheet,
  },
  data() {
    return {
      json: json,
      currentYear: new Date().getFullYear(),
    };
  },
});
