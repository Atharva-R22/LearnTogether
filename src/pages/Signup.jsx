import signupImg from "../assets/Images/SignUpImg.jpg"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join with LearnTogether"
      description1=""
      description2=""
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup