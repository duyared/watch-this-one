import { useState } from "react";
import { Form } from "react-router-dom";



export default function LoginSignUpModal({isOpen,onClose}){
    const [activeTab,setActiveTab] = useState('signup')
    
    const handleTabChange = (tab) =>{
        setActiveTab(tab);
        console.log('in handler',tab)
    }

    const handleFormSubmit = () =>{

    }

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
                            <Form className="login-form" onSubmit={handleFormSubmit}>
                                <h2>Login</h2>
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="password" name="password" placeholder="Password" required />
                                <button type="submit">Login</button>
                            </Form>
                        ):(
                        <Form className="signup-form" onSubmit={handleFormSubmit}>
                                <h2>Sign Up</h2>
                                <input type="text" name="username" placeholder="UserName" required />
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="password" name="password" placeholder="Password" required />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
                                <button type="submit">Sign Up</button>
                        </Form>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}