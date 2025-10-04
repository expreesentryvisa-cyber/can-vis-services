import CreateAccount from './CreateAccount'
import HeaderNotice from './HeaderNotice'
import ChooseSignin from './ChooseSignin'

function AuthPage() {
 return (
    <div className="auth-page">
      <HeaderNotice/>
      
      <div className="auth-container">
        <div className="auth-boxes">
          <ChooseSignin />
          
          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or</div>
            <div className="divider-line"></div>
          </div>
          
          <CreateAccount />
        </div>
      </div>
      </div>
  )
}

export default AuthPage