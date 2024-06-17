import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Fill } from "react-icons/ri";
import EditModal from "./EditModal";
import {toast} from 'react-hot-toast';
import { FcLike } from "react-icons/fc";
const Data = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      try {
        setLoading(true);
        const response = await axios.get(url);
        const usersWithLikes = response.data.map(user => ({ ...user, like: false }));
        setData(usersWithLikes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true); 
  };

  const handleSaveEdit = (editedUser) => {
    setData(
      data.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setEditingUser(null);
    setIsModalOpen(false); 
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsModalOpen(false); 
  };

  const handleDelete = (userId) => {
    const newData = data.filter((user) => user.id !== userId);
    setData(newData);
    toast.success("Delete successfully")
  };

  const handleChange = (userId) => {
    setData(data.map(user => user.id === userId ? { ...user, like: !user.like } : user));
  };

  return (
    <div className="user-grid">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row mx-3 my-3">
          {data.map((user) => (
            <div key={user.id} className="col-md-3">
              <div className="card" style={{ maxWidth: "100%", margin: "5px",border:"1px solid lightgrey ", backgroundColor:"rgb(246,245,245)" }}>
                <img className="card-img-top"
                  src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                  alt="Avatar"
                  style={{ height: "40%", width: "40%", objectFit: "cover",alignItems:"center",marginLeft:"110px"}}
                />
                <div className="card text"  >
                  <h5 className="card-title" style={{marginLeft:"20px"}}>{user.name}</h5>
                  <p className="card-text" style={{marginLeft:"20px"}}><MdOutlineMail /> {user.email}</p>
                  <p className="card-text" style={{marginLeft:"20px"}}><AiOutlinePhone /> {user.phone}</p>
                  <p className="card-text" style={{marginLeft:"20px"}}><BsGlobe2 /> {user.website}</p>
                </div>
                <div className="card-body" style={{ marginLeft: "20px", marginRight: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span onClick={() => handleChange(user.id)}
                    style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px" }}>
                    {user.like ? <FcLike style={{ fontSize: "30px" }}/> : <MdOutlineFavoriteBorder style={{ fontSize: "30px" }}/>}
                  </span>{" "}
                  |
                  <span onClick={() => handleEdit(user)}
                    style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px" }}>
                    <AiOutlineEdit style={{ fontSize: "30px" }} />
                  </span>{" "}
                  |
                  <span onClick={() => handleDelete(user.id)}
                    style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px" }}>
                    <RiDeleteBin7Fill style={{ fontSize: "30px" }}/>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && editingUser && (
        <EditModal
          isOpen={isModalOpen}
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};
export default Data;
