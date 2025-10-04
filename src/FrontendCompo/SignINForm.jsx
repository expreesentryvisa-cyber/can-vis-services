import React from 'react'
import "../SigninForm.css"
import Header2 from './Header2'
import SecureAccessBox from './SecureAcess'
import "../SignInForminSignGCKey.css"
import WelcomeHeader from './WelcomeHeader'
import SigninBoxinForm from './SigninBoxinForm'
import Footer from './Footer'
import GCKeyFooter from './GckeyFooter'
function SignINForm() {
  return (
    <>
    <div className="app">
      <Header2 />
       <div className="gc-breadcrumb">
        <a href="#">Home</a> ➝ <span>Sign In / Sign Up</span>
      </div>
      <main className="main-content">
        <WelcomeHeader/>
         <div className="login-card">
      <div className="card-left">
        <SigninBoxinForm />
      </div>
      <div className="card-divider"></div>
      <div className="card-right">
        <SecureAccessBox />
      </div>
    </div>
        
        <div className="exit-section">
          <p className="exit-text">
            Please select <strong>Exit</strong> to leave the GCKey service and return to the Government of Canada online service.
          </p>
          <button className="btn btn-exit">Exit</button>
        </div>
      <Footer/>
      </main>
      </div>
      <GCKeyFooter/>
    </>
  )
}

export default SignINForm