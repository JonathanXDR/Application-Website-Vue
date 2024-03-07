import { graphql, type GraphQlQueryResponseData } from '@octokit/graphql'
import { Octokit } from 'octokit'
import type { GetRepositoryIssues } from '~/types/services/GitHub/Issue'
import type {
  GetOwnerRepositories,
  GetPublicRepositories,
  GetUserRepositories
} from '~/types/services/GitHub/Repository'
import type { GetRepositoryTags } from '~/types/services/GitHub/Tag'
import type { GetRepositoryTopics } from '~/types/services/GitHub/Topic'

const { githubToken } = useRuntimeConfig()

const octokit = new Octokit({
  auth: githubToken
})

const graphqlInstance = graphql.defaults({
  headers: {
    authorization: `token ${githubToken}`
  }
})

export async function getPublicRepositories (params: {
  since?: number
}): Promise<GetPublicRepositories> {
  const { since } = params

  try {
    const response = await octokit.request('GET /repositories', {
      since,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching public repositories:', error)
    throw error
  }
}

export async function getUserRepositories (params: {
  username: string
  type?: 'all' | 'owner' | 'member' | undefined
  sort?: 'full_name' | 'created' | 'updated' | 'pushed' | undefined
  direction?: 'asc' | 'desc' | undefined
  perPage?: number
  page?: number
}): Promise<GetUserRepositories> {
  const {
    username,
    type = 'owner',
    sort = 'full_name',
    direction = 'asc',
    perPage = 30,
    page = 1
  } = params

  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username,
      type,
      sort,
      direction,
      per_page: perPage,
      page,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching repositories for user ${username}:`, error)
    throw error
  }
}

export async function getOwnerRepositories (params: {
  owner: string
  repo: string
}): Promise<GetOwnerRepositories> {
  const { owner, repo } = params

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching repository for owner ${owner}:`, error)
    throw error
  }
}

export async function getRepositoryTags (params: {
  owner: string
  repo: string
  perPage?: number
  page?: number
}): Promise<GetRepositoryTags> {
  const { owner, repo, perPage = 30, page = 1 } = params

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/tags', {
      owner,
      repo,
      per_page: perPage,
      page,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching tags for repository ${repo}:`, error)
    throw error
  }
}

export async function getRepositoryIssues (params: {
  owner: string
  repo: string
  milestone?: string
  state?: 'open' | 'closed' | 'all'
  assignee?: string
  creator?: string
  mentioned?: string
  labels?: string
  sort?: 'created' | 'updated' | 'comments'
  direction?: 'asc' | 'desc'
  since?: string
  perPage?: number
  page?: number
}): Promise<GetRepositoryIssues> {
  const {
    owner,
    repo,
    milestone,
    state = 'open',
    assignee,
    creator,
    mentioned,
    labels,
    sort = 'created',
    direction = 'desc',
    since,
    perPage = 30,
    page = 1
  } = params

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo,
      milestone,
      state,
      assignee,
      creator,
      mentioned,
      labels,
      sort,
      direction,
      since,
      per_page: perPage,
      page,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching issues for repository ${repo}:`, error)
    throw error
  }
}

export async function getRepositoryTopics (params: {
  owner: string
  repo: string
  perPage?: number
  page?: number
}): Promise<GetRepositoryTopics> {
  const { owner, repo, perPage = 30, page = 1 } = params

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/topics', {
      owner,
      repo,
      per_page: perPage,
      page,
      headers: {
        accept: 'application/vnd.github+json'
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching topics for repository ${repo}:`, error)
    throw error
  }
}

export async function getUserPinnedRepositories (params: {
  username: string
  perPage?: number
}): Promise<GetUserRepositories> {
  const { username, perPage = 30 } = params

  const query = `
{
  user(login: "${username}") {
    pinnedItems(first: ${perPage}, types: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            repositoryTopics(first: ${perPage}) {
              nodes {
                topic {
                  name
                }
                url
              }
            }
            primaryLanguage {
              color
              name
            }
            licenseInfo {
              name
              nickname
              url
            }
            forks(first: ${perPage}) {
              nodes {
                url
              }
            }
            stargazers(first: ${perPage}) {
              nodes {
                url
              }
            }
            issues(first: ${perPage}) {
              nodes {
                closed
                url
              }
            }
            pullRequests(first: ${perPage}) {
              nodes {
                closed
                url
              }
            }
            updatedAt
          }
        }
      }
    }
  }
}
  `

  const remapProps = (item: any) => {
    const {
      name,
      description,
      url,
      repositoryTopics,
      primaryLanguage,
      licenseInfo,
      forks,
      stargazers,
      issues,
      pullRequests,
      updatedAt
    } = item

    return {
      name,
      description,
      html_url: url,
      topics: repositoryTopics.nodes.map((node: any) => node.topic.name),
      language: primaryLanguage?.name,
      license: licenseInfo,
      forks: forks.nodes.map((node: any) => node.url),
      stars: stargazers.nodes.map((node: any) => node.url),
      issues: issues.nodes
        .filter((node: any) => !node.closed)
        .map((node: any) => node.url),
      pullRequests: pullRequests.nodes
        .filter((node: any) => !node.closed)
        .map((node: any) => node.url),
      updated_at: updatedAt
    }
  }

  try {
    const response = await graphqlInstance<GraphQlQueryResponseData>(query)
    const pinnedRepositories = response.user.pinnedItems.edges.map(
      (edge: any) => remapProps(edge.node)
    )
    return pinnedRepositories
  } catch (error) {
    console.error(
      `Error fetching pinned repositories for user ${username}:`,
      error
    )
    throw error
  }
}
