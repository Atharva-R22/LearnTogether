import loginImg from "../assets/Images/loginImg.jpg"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1=""
      description2=""
      image={loginImg}
      formType="login"
    />
  )
}

export default Login