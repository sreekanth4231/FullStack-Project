import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "";

const CardForm = () => {



const[isLogin, setIsLogin] = useState(false);
const[form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    age: "",
    gender: "",
    contact: "",
    image: ""
})

const navigate = useNavigate();

const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});

};

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        if(isLogin){
            const res = await axios.post(`${API_BASE}/login`,{
                username : form.username,
                password: form.password
            });
            localStorage.setItem("card", JSON.stringify(res.data.card))
            navigate(`/profile/${res.data.card._id}`)
        }else{
             const formData = new FormData();
             formData.append("username", form.username);
             formData.append("password", form.password);
             formData.append("email", form.email);
             formData.append("age", form.age);
             formData.append("gender", form.gender);
             formData.append("contact", form.contact);
             formData.append("image", form.image);

            const res = await axios.post(`${API_BASE}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(formData)
            console.log(res.data);
            setIsLogin(true)
            setForm({
                username: "",
                password: "",
                email: "",
                age: "",
                gender: "",
                contact: "",
                image: ""
            })
            
        }
    }catch(error){
        console.error(error);
          alert("Login/Register failed. Please check your credentials or try again.");
    }
}

  return (
    <div>
      <h2> {isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text" name="username" value={form.username} placeholder="Username" required onChange={handleChange}
        />
        <input
            type="password" name="password" value={form.password} placeholder="Password" required onChange={handleChange}
        />

        {!isLogin && <>

        <input
            type="email" name="email" value={form.email} placeholder="Email" required onChange={handleChange}
        />
        <input
            type="number" name="age" value={form.age} placeholder="Age" required onChange={handleChange}
        />
        <input
            type="text" name="gender" value={form.gender} placeholder="Gender" required onChange={handleChange}
        />
        <input
            type="number" name="contact" value={form.contact} placeholder="Contact" required onChange={handleChange}
        />
        <input
            type="file" name="image" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        </>}

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p onClick={()=> setIsLogin(!isLogin)} style={{cursor: "pointer", color: "blue"}}>
      {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
     </p>
     <Link to="/contact">Contact us</Link>
    </div>
  )
}

export default CardForm
