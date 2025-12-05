import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios';
const API_BASE = "";


const Profile = () => {
    const params = useParams();
    const {id} = params;
    const [card, setCard] = useState("");

    const navigate = useNavigate();

    useEffect(()=> {
        axios.get(`${API_BASE}/${id}`)
        .then((res)=> setCard(res.data))
        .catch((error)=> console.error(error));
    },[id]);

    const handleLogout = () => {
        localStorage.removeItem("card");
        navigate("/card");
    }
  return (
    <>

     <div>
    <h2>Welcome {card.username}</h2>
    <p>
        <strong>Age:</strong>{card.age}
    </p>
    <p>
        <strong>Gender:</strong>{card.gender}
    </p>
    <p>
        <strong>Email ID:</strong>{card.email}
    </p>
    <p>
        <strong>Contact No:</strong>{card.contact}
    </p>
    
{card.image && (
  <img
    src={`/${card.image}`}
    alt={card.username}
    width="200"
  />
)}
      <button onClick={handleLogout}>Logout</button>
    </div>

    </>
   
  )
}

export default Profile
