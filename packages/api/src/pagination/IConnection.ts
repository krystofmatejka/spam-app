import { PageInfo } from './PageInfo'

export interface IConnection<TEdge> {
  edges: TEdge[]
  pageInfo: PageInfo
}
