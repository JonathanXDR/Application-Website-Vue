import { reactive, toRefs } from 'vue'

export const useAnimationStore = () => {
  const state = reactive({
    headerAnimations: [] as Array<{
      element: HTMLElement
      class: string
      timeout: number
    }>
  })

  function setHeaderAnimation(headerAnimation: {
    element: HTMLElement
    class: string
    timeout: number
  }) {
    state.headerAnimations.push(headerAnimation)
  }

  return {
    ...toRefs(state),
    setHeaderAnimation
  }
}
