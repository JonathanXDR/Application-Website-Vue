import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import type { DateItem } from '@/types/common/DateItem'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AboutSection',
  components: {
    LoadingSpinner,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardTile,
    ArticleItem,
    TimeLine
  },
  setup() {
    const { tm } = useI18n()

    const dateItems = tm('components.containers.about.dates') as DateItem[]
    const dates = ref<{ age: string; apprenticeshipYear: string }>({
      age: '',
      apprenticeshipYear: ''
    })

    const calculateYears = (date: string) => {
      const currentDate = new Date(Date.now())
      const birthDate = new Date(date)
      const difference = new Date(currentDate.getTime() - birthDate.getTime())
      const years = Math.abs(difference.getUTCFullYear() - 1970)
      return years
    }

    onMounted(async () => {
      dateItems.forEach((item) => {
        dates.value[item.key] = calculateYears(item.date)
      })
    })

    return {
      tm,
      dates,
      calculateYears
    }
  }
})
