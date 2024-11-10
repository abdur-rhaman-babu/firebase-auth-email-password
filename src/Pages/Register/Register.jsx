import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmitWithEmailPassword = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);
    setPassword("");
    setErrorMessage("");
    if (password.length < 6) {
      setPassword("Password must be 6 character");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPassword(
        "At least one character, one digit, one uppercase, one lowercase"
      );
      return;
    }

    if(!terms){
      setPassword('Please checked the terms and condition')
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setErrorMessage("successfully added");
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-2xl text-center mt-3 font-bold">Login now!</h1>
        <form
          onSubmit={handleSubmitWithEmailPassword}
          className="card-body relative"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <h2 className="font-semibold text-base text-red-700">
              {errorMessage}
            </h2>

            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-10 top-44"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <h2 className="font-semibold text-base text-red-700">{password}</h2>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            <div className="form-control">
              <label className="cursor-pointer justify-start gap-4 label">
                <input
                  type="checkbox"
                  name="terms"
                  className="checkbox checkbox-accent"
                />
                <span className="label-text">Are you agree??</span>
              </label>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
