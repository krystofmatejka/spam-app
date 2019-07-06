import { MoreThan } from 'typeorm'
import { decodeCursor } from './decodeCursor'

export const composeFindOptions = (first, after) => {
  const findOptions: any = {
    take: first + 1
  }

  if (after) {
    findOptions.where = {
      id: MoreThan(decodeCursor(after))
    }
  }

  return findOptions
}
