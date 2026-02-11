import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setProfilePhotoUrl(user.profilePhotoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);
    }
  }, [user]);

  useEffect(() => {}, [user]);

  const handleSaveProfile = async () => {
    setError("");

    try {
      const resp = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, profilePhotoUrl, about, age, gender },
        { withCredentials: true },
      );

      dispatch(addUser(resp?.data?.data));
      setShowToast(true);

      //after 3 sec disable the toast
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    user && (
      <div className="flex justify-between mx-auto w-[50%]">
        <div className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mt-5 ">
          <legend className="fieldset-legend text-lg">Edit profile</legend>

          <label className="label">First Name :</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="label">Last Name :</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Profile Photo URL :</label>
          <input
            type="text"
            className="input"
            value={profilePhotoUrl}
            onChange={(e) => setProfilePhotoUrl(e.target.value)}
          />
          <label className="label">Age :</label>
          <input
            type="number"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="label">Gender :</label>
          <select
            className="select appearance-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>
          <label className="label">About :</label>
          <textarea
            className="textarea resize-none"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <p className="text-red-500 text-[15px] font-bold">{error} </p>
          <div className="mx-auto w-[60%] mt-2">
            <button
              className="btn btn-primary w-full"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
        <div className="">
          <UserCard user={{ firstName, lastName, profilePhotoUrl, about }} />
        </div>

        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
