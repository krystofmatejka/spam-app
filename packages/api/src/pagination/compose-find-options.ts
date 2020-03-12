import {LessThan} from 'typeorm'
import {decodeCursor} from './encoder'

export const composeFindOptions = (first, after, findOptions: any = {}) => {
  findOptions.take = first + 1
  findOptions.order = {
    id: 'DESC'
  }

  if (after) {
    findOptions.where = {
      id: LessThan(decodeCursor(after)),
      ...findOptions.where
    }
  }

  return findOptions
}
