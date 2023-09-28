import { useState } from 'react'
import '../../css/checkbox.css'

const Checkbox = ({ label, checked, ...props }) => {
  const defaultChecked = checked || false
  const [isChecked, setIsChecked] = useState(defaultChecked)

  return (
    <div className='checkbox-wrapper'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        {...props}
      />
      <span className='checkbox-label'>{label}</span>
    </div>
  )
}
export default Checkbox
