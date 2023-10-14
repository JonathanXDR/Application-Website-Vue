import type { ArticleItem } from '../common/ArticleItem'
import type { About } from './About'
import type { CommonContainers } from './Common'
import type { Languages } from './Languages'
import type { Other } from './Other'
import type { Projects } from './Projects'
import type { References } from './References'
import type { Technologies } from './Technologies'

export type Containers = ArticleItem & {
  common: CommonContainers
  about: About
  languages: Languages
  references: References
  other: Other
  technologies: Technologies
  projects: Projects
}
