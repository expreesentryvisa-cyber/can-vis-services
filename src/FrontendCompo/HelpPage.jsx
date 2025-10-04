import FeedbackBox from "./FeedbackBox"
import Footer from "./Footer"
import HelpSection from "./HelpSection"
import AcountLink from "./AcountLink"
function HelpPage() {
return (
    <>
    <div className="help-page">
      <HelpSection />
      <AcountLink />
      <FeedbackBox />
      <Footer />
      </div>
    </>
  )
}

export default HelpPage