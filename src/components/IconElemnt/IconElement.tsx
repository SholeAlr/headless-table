import { FC } from 'react'
import { IconElementProps } from './@types/icon-element-props.type'

const IconElement: FC<IconElementProps> = ({ icon, variant = 'Outline', ...props }) => {
  const IconElement = icon
  return <IconElement variant={variant} {...props} />
}

export default IconElement
