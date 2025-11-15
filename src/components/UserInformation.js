export default function UserInformation({
  username,
  email,
  birth,
  gender,
  contact,
}) {
  return (
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">User Information</p>
        <button className="text-md text-white fontmedium bg-[#111] px-4 py-1">
          Edit Profile
        </button>
      </div>
      <div className="mt-8">
        <p className="text-xl text-gray-800 font-medium">Personal Profile</p>
        <div className="flex gap-8 mt-2">
          <div className="flex flex-col gap-4">
            <p>Name</p>
            <p>Birth of Date</p>
            <p>Gender</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>{username}</p>
            <p>{birth ?? "Haven't set yet"}</p>
            <p>
              {gender === "male"
                ? "Male"
                : gender === "female"
                ? "Female"
                : "Haven't set yet"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-xl text-gray-800 font-medium">Contact</p>
        <div className="flex gap-8 mt-2">
          <div className="flex flex-col gap-4">
            <p>Email</p>
            <p>Phone Number</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>{email}</p>
            <p>{contact ?? "Haven't set yet"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
