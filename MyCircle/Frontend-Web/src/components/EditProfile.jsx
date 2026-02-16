import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName || "");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(user.profilePhotoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "Male");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

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
      <div className="md:flex justify-between mx-auto xl:w-[50%]">
        <div className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mt-5 mx-auto">
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
            onChange={(e) => setGender(e.target.value)}
            value={gender}
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
