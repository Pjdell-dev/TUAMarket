import React, {useState} from 'react';
import './Header.css';
import './LogIn.css';
import { useNavigate } from "react-router-dom";

function LogIn() {

     const ip = process.env.REACT_APP_LAPTOP_IP; //IP address (see env file for set up)

     const [eyeBtn, setEyeBtn] = useState("bi bi-eye-fill");
     const [passType, setPassType] = useState("password");
     const [user, setUser] = useState("");
     const [password, setPassword] = useState("");

     const togglePassword = (eyeType) => {

        if (eyeType == "bi bi-eye-fill"){
            setEyeBtn("bi bi-eye-slash-fill");
            setPassType("text");
        }

        else if(eyeType == "bi bi-eye-slash-fill"){
            setEyeBtn("bi bi-eye-fill");
            setPassType("password");
        }
     }

    const handleUserChange = (event) => setUser(event.target.value);
    const handleUserPassword = (event) => setPassword(event.target.value);

    const navigate = useNavigate();

     const handleLogIn = (event) => {
        event.preventDefault();
    
        fetch(`${ip}/tua_marketplace/handleLogIn.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            password
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Server response:", data);
            alert("Server Response: " + data.message);
          })
          .catch((error) => console.error("Error:", error));
      };

  return (
    <>
    <div class="pageWrapper">
        <header className="headerLogIn">
            <div className="logo">
                <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Trinity_University_of_Asia_seal.svg/1200px-Trinity_University_of_Asia_seal.svg.png" 
                alt="TUA Logo" 
                />
            </div>
            <h1>TUA Marketplace</h1>
        </header>

        <div class="logInBG">
            <div className="logInBox">
                <div className="logInContents">
                    <h1 className="logInTitle">TUA Marketplace</h1>
                    <form onSubmit={handleLogIn}>
                            <i className="bi bi-person-fill" id="iconLogo"></i>
                            <input id="userName" type="text" name="username" placeholder="Username" onChange={handleUserChange} required/>
                            <br/><br/>
                            <i className="bi bi-key-fill" id="iconLogo"></i>
                            <input className="password" type={passType=="password" ? "password" : "text"} name="password" placeholder="Password" id="logInPass" onChange={handleUserPassword} required/>
                            <i className={eyeBtn=="bi bi-eye-fill" ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"} id="eyeBtn1" onClick={() => togglePassword(eyeBtn)}/>
                            <br/><br/>
                            <button type="submit" className='signInButton'>Sign In</button>
                    </form>
                    <a href="" className='forgotPass'>Forgot Password?</a>
                    <h4>OR</h4>
                    <button className='googleLogIn'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt='Google Logo' className='gLogo'/>
                        Continue with Google
                        </button>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default LogIn;
