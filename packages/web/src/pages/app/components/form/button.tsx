import React, {FunctionComponent} from 'react'
// @docs https://orbit.kiwi/components/button/
import KiwiButton from '@kiwicom/orbit-components/lib/Button'

interface ButtonProps {
  submit?: boolean,
  disabled?: boolean
}

export const Button: FunctionComponent<ButtonProps> = ({disabled, submit, children}) => {
  return <KiwiButton disabled={disabled} submit={submit}>{children}</KiwiButton>
}

interface SubmitButtonProps {
  disabled?: boolean
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({disabled, children}) => {
  return <Button disabled={disabled} submit={true}>{children}</Button>
}
