import React, {FunctionComponent, ChangeEvent} from 'react'
// @docs https://orbit.kiwi/components/inputfield/react/
import KiwiInputField from '@kiwicom/orbit-components/lib/InputField'

interface Props {
  value: string,
  placeholder?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FunctionComponent<Props> = ({value, onChange, placeholder}) => {
  return <KiwiInputField value={value} onChange={onChange} placeholder={placeholder}/>
}
