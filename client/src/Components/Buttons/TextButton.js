import { useSelector } from 'react-redux';
import '../../css/button.css'


const TextButton = ({ id }) => {
  const label = useSelector(state => state.textButton[id]);
  return (
    <div className='test'>
        <button className='textButton'>{label}</button>
    </div>
  );
};

export default TextButton;