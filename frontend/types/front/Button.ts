export type Button = {
  visible?: boolean
  disabled?: boolean
  action?: () => void
  label?: string
  styleClass?: string
  icon?: string
  color?: string
  variant?: string
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
}
