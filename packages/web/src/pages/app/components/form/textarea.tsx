import React, {FunctionComponent, ChangeEvent} from 'react'
import KiwiTextarea from '@kiwicom/orbit-components/lib/Textarea'

interface Props {
  value: string,
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FunctionComponent<Props> = ({value, onChange}) => {
  return <KiwiTextarea value={value} onChange={onChange}/>
}
