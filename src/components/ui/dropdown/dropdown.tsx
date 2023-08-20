import { Card } from '../card/Card.tsx'

import s from './dropdown.module.scss'

type DropdownProps = {
  options: React.ReactNode[]
  isDropdownOpen?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({ options, isDropdownOpen }) => {
  return (
    <>
      {isDropdownOpen && (
        <div className={s.content}>
          <div className={s.triangle}></div>
          <div className={s.triangleBackground}></div>
          <Card className={s.card}>
            {options.map((el, index) => {
              return (
                <div className={s.option} key={index}>
                  {el}
                  <div className={s.divider} />
                </div>
              )
            })}
          </Card>
        </div>
      )}
    </>
  )
}
// добавить для дроп дауна язычок при его включении
