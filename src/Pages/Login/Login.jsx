import { sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { useRef, useState } from "react";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef()
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value
    // console.log(email, password);

    signInWithEmailAndPassword(auth, email,password)
      .then((result) => {
        
        if (!result.user.emailVerified) {
          setErrorMessage("Please varify your email");
          setSuccess('')
        } else {
          setSuccess(true);
          setErrorMessage('')
          console.log(result.user);
        }

        const profile = {
          displayName: name,
          photoURL: photo
        }
        updateProfile(auth.currentUser, profile)
        .then(()=>{
          alert('update your profile')
        })

      })
      .catch((error) => {
        console.log("ERROR", error);
      });

  };

  const handleForgetPassword = () =>{
    console.log('forget password',emailRef)
    const email = emailRef.current.value;
    console.log(email)
    if(!email){
      alert('please input valid email')
    }else{
      sendPasswordResetEmail(auth, email)
      .then(()=>{
        alert('Sent a reset email in your account')
      })
    }
  }
  return (

        <div className="card bg-base-100 mx-auto w-full max-w-sm mt-10 shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo"
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgetPassword} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p className="text-red-600 font-semibold">{errorMessage}</p>
            <p className="text-green-400 font-semibold">{success && "Login Successfully"}</p>
          </form>
        </div>
  );
};

export default Login;
