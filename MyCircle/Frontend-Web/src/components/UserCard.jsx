import React from "react";

const UserCard = ({ user, sendRequest }) => {
  const { firstName, lastName, profilePhotoUrl, about } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm mx-auto mt-5">
        <figure className="p-5">
          <img src={profilePhotoUrl} alt="Profile pic" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center -mt-4">
          <h2 className="card-title text-2xl">{firstName + " " + lastName}</h2>
          <p className="textarea-lg">{about}</p>
          {sendRequest && (
            <div className="card-actions">
              <button
                className="btn btn-primary mx-2"
                onClick={() => sendRequest(user._id, "ignored")}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => sendRequest(user._id, "interested")}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
