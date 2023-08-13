import TextButton from '../Components/Buttons/text_button'
import Checkbox from '../Components/Buttons/checkbox'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import { useDispatch } from 'react-redux'
import { hideSideBar } from '../features/sidebar_slice'
import { useEffect } from 'react'

const LogInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    const edge = document.querySelector('.edge-login')
    edge.style.transform = 'translateY(-96vh) translateX(-96vw) scale(26, 26)'

    const hideButton = document.querySelector('.edge-button')
    hideButton.style.display = 'none'
  }

  const handleAnimationEnd = () => {
    navigate('/SignUp')
  }

  const logIn = () => {
    navigate('/Home')
  }

  useEffect(() => {
    dispatch(hideSideBar())
  })

  return (
    <div className='login-page'>
      <div className='split-left-login'>
        <h1 className='teamoji-title'>TEAMOJI</h1>
      </div>
      <div className='split-right-login'>
        <div className='login-container'>
          <h2>Login</h2>
          <div className='input-container'>
            <input
              className='user-input'
              placeholder='Username'
              type='text'
            />
            <input
              className='user-input'
              type='password'
              name='password'
              placeholder='Password'
            />

            <div className='remember-me-container'>
              <Checkbox label='Remember Me' checked />
            </div>
          </div>
          <TextButton
            id='submit'
            customStyle={{ width: '10vw', height: '5vh', color: '#beafe1' }}
            handleClick={logIn}
          />
          <div className='guest'>Continue as Guest</div>
        </div>

        <div className='edge-wrapper'>
          <div
            className='edge-login'
            onTransitionEnd={handleAnimationEnd}
          />
          <TextButton
            id='sign-up'
            handleClick={handleClick}
            type='edge-button'
            textColor='white'
          />
        </div>
      </div>
    </div>
  )
}

export default LogInPage
