import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue'
import CardItem from '@/components/common/CardItem/CardItem.vue'
import CardTile from '@/components/common/CardTile/CardTile.vue'
import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LiveResultSummary from '@/components/common/LiveResultSummary/LiveResultSummary.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import NavBarExtension from '@/components/common/NavBarExtension/NavBarExtension.vue'
import ResultBlankState from '@/components/common/ResultBlankState/ResultBlankState.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import SegmentNav from '@/components/common/SegmentNav/SegmentNav.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import { listPinnedRepositories, listUserRepositories } from '@/helpers/github-helper'
import { useColorStore } from '@/stores/color'
import type { ArticleItemType } from '@/types/common/ArticleItem'
import type { ListUserReposResponse } from '@/types/GitHub/Repository'
import { computed, defineComponent, onMounted, reactive, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ProjectsSection',
  components: {
    LoadingSpinner,
    RibbonBar,
    NavBarExtension,
    LinkCollection,
    ShareSheet,
    CardTile,
    CardItem,
    LiveResultSummary,
    ResultBlankState,
    ArticleItem,
    SegmentNav,
    TimeLine
  },
  props: {
    title: {
      type: String,
      required: true,
      default: undefined
    }
  },
  async setup(props) {
    const { tm } = useI18n()
    const colorStore = useColorStore()
    const articles: Ref<ArticleItemType[]> = computed(() => tm('components.containers.projects'))
    const projects = reactive({
      swisscom: computed(() => tm('components.containers.projects')) as Ref<ArticleItemType[]>,
      personal: [] as ListUserReposResponse[],
      school: [] as ListUserReposResponse[]
    })
    const pinned: Ref<ListUserReposResponse[]> = ref([])
    const currentProjects = computed(() => projects[Object.keys(projects)[currentIndex.value]])
    const currentIndex: Ref<number> = ref(0)
    const randomColor = ref(colorStore.randomizeColor().colorName)

    const updateCurrentIndex = (index: number) => {
      currentIndex.value = index
    }

    const categorizeProject = (project: any) => {
      const schoolProjectPattern = /^(M\d+|UEK-\d+)-Portfolio$|^(TBZ|UEK)-Modules$/i
      const category = schoolProjectPattern.test(project.name) ? 'school' : 'personal'
      return { ...project, category }
    }

    const fetchProjects = async () => {
      const allProjects = await listUserRepositories({
        username: 'JonathanXDR',
        perPage: 100
      })

      const pinnedProjects = await listPinnedRepositories({
        username: 'JonathanXDR',
        perPage: 100
      })

      pinnedProjects.forEach((project) => {
        project.icon = {
          name: 'pin.fill',
          colors: {
            primary: `var(--color-figure-${randomColor.value})`
          }
        }
      })

      const filteredProjects = allProjects.filter(
        (project) => !pinnedProjects.find((pinnedProject) => pinnedProject.name === project.name)
      )

      pinned.value = pinnedProjects

      filteredProjects.map(categorizeProject).forEach((project) => {
        projects[project.category].push(project)
      })
    }

    onMounted(() => {
      fetchProjects()
    })

    return {
      props,
      tm,
      randomColor,
      articles,
      projects,
      currentProjects,
      pinned,
      updateCurrentIndex,
      currentIndex
    }
  }
})
