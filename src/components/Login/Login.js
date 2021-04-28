import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    // const googleSignIn = () => {
    //     handleGoogleSignIn()
    //         .then(res => {
    //             handleResponse(res, true)
    //         })
    // }

    // const signOut = () => {
    //     handleSignOut()
    //         .then(res => {
    //             handleResponse(res, false)
    //         })
    // }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        //console.log(e.target.name, e.target.value);
        //debugger;
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            //console.log(isEmailValid);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            //[...cart, newItem]
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    // const handleBlur = (e) => {
    //   console.log(e.target.name, e.target.value);
    // }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();

    }
    // const handleResponse = (res, redirect) => {
    //     setUser(res)
    //     const { name, email } = res
    //     const signedInUser = { name: name, email: email }

    //     setLoggedInUser(signedInUser)
    //     if (redirect) {
    //         history.replace(from);
    //     }
    // }

    //     const handleSubmit = (e) => {
    //         //console.log(user.email, user.password);
    //         if (newUser && user.email && user.password) {
    // }

    // if (!newUser && user.email && user.password) {

    // }

    // e.preventDefault();
    //     }

    return (
        // <div style={{ textAlign: 'center' }}>
        //     {
        //         user.isSigned ? <button onClick={signOut}> Sign Out</button>
        //             : <button onClick={googleSignIn}>  Sign In</button>
        //     }
        //     <br />
        //     {
        //         user.isSigned &&
        //         <div>
        //             <p>Welcome {user.name} </p>
        //             <p>Your Mail: {user.email}</p>
        //             <img src={user.photo} alt="" />
        //         </div>
        //     }
        //     <br />
        //     <h1>Our Authentication</h1>
        //     <input type="checkbox" onChange={() => setNewUser(!newUser)} name="userName" />
        //     <label htmlFor="newUser">New-user-Sign-up</label>


        //     <form onSubmit={handleSubmit}>
        //         {newUser &&
        //             <input onChange={handleBlur} name="name" type="text" placeholder="name" />


        //         }
        //         <br />
        //         <input required name="email" onChange={handleBlur} placeholder="Your Email Address" type="email" />
        //         <br />
        //         <input name="password" onChange={handleBlur} placeholder="Your Password" type="password" required />
        //         <br />
        //         <input type="submit" value={newUser ? 'Sign-up' : 'Sign-in'} />
        //     </form>

        //     {/* <button onClick={() => resetPass(user.email)}>Forget or reset password</button> */}

        //     <p style={{ color: 'red' }}>{user.error}</p>

        //     {
        //         user.success && <p style={{ color: 'green' }}>user {newUser ? "successfully" : "logged in"} created</p>
        //     }
        // </div>



        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                    <button onClick={googleSignIn}>Sign In</button>
            }
            <br />
            <button>Sign in using Facebook</button>
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt=""></img>
                </div>
            }

            <h1>Our own authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            {/* <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password} </p> */}
            <form onSubmit={handleSubmit}>
                <br />
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Your email address" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
    );
}

export default Login;
