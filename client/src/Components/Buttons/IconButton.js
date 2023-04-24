import { useSelector } from 'react-redux';
import './button.css';

const IconButton = ({ id }) => {
  const icon = useSelector(state => state.iconButton[id]);
  return (
    <div className='test'>
        <button className='iconButton'>{icon}</button>
    </div>
  );
};

export default IconButton;