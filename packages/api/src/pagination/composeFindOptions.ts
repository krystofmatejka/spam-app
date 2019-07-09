import { LessThan } from 'typeorm'
import { decodeCursor } from './decodeCursor'

export const composeFindOptions = (first, after) => {
  const findOptions: any = {
    take: first + 1,
    order: {
      id: 'DESC'
    }
  }

  if (after) {
    findOptions.where = {
      id: LessThan(decodeCursor(after))
    }
  }

  return findOptions
}
