import { useState,useEffect } from "react";
import { Form, useNavigation } from "react-router-dom";



export default function LoginSignUpModal({isOpen,onClose,message,errorMessage}){
    const [activeTab,setActiveTab] = useState('signup')
    const navigation = useNavigation()

    const handleTabChange = (tab) =>{
        setActiveTab(tab);
    }
    useEffect(() => {
        if (errorMessage === 'success') {
          onClose()
        }
      }, [errorMessage]);
    return(
        
        <div className={`modal ${isOpen ? 'open': ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <div className="tab-buttons">
                        <button className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                             onClick={()=>handleTabChange('login')}>Login
                        </button>
                        <button className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
                             onClick={()=>handleTabChange('signup')}>Sign Up
                        </button>
                    </div>
                    <div className="form-container">
                        {activeTab === 'login' ? (
                            <Form method="post" className="login-form">
                                <h2>Login</h2>
                                {message && <h3 className="red">{message}</h3>}
                                {errorMessage && <h3 className="red">{errorMessage}</h3>}
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="password" name="password" placeholder="Password" required />
                                <button  disabled={navigation.state === "submitting"} name="form" value="login">
                                    {navigation.state==="submitting" 
                                      ? "Logging in ..."
                                      :"Login"
                                    }</button>
                            </Form>
                        ):(
                        <Form method="post" className="signup-form" >
                                <h2>Sign Up</h2>
                                {message && <h3 className="red">{message}</h3>}
                                {errorMessage && <h3 className="red">{errorMessage}</h3>}
                                <input type="text" name="username" placeholder="UserName" required />
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="password" name="password" placeholder="Password" required />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
                                <button  disabled={navigation.state ==="submitting"} name="form" value="signUp">
                                    {navigation.state ==="submitting" ?
                                    "Signing in..."
                                    :"Sign Up"
                                    }
                                    </button>
                        </Form>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}