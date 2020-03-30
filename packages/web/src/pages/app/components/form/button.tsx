import React, {FunctionComponent} from 'react'
// @docs https://orbit.kiwi/components/button/
import KiwiButton from '@kiwicom/orbit-components/lib/Button'

interface ButtonProps {
  submit?: boolean,
  disabled?: boolean,
  onClick?: () => void
}

export const Button: FunctionComponent<ButtonProps> = ({disabled, submit, onClick, children}) => {
  return <KiwiButton
    disabled={disabled}
    submit={submit}
    onClick={onClick}
  >{children}</KiwiButton>
}

interface SubmitButtonProps {
  disabled?: boolean,
  onClick?: () => void
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({disabled, onClick, children}) => {
  return <Button
    disabled={disabled}
    onClick={onClick}
    submit={true}
  >{children}</Button>
}
