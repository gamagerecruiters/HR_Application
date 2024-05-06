import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
    const { user } = useContext(Context);
    const [user1, setUser1] = useState(null);

    const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8800/api-v1/auth/getuser",
            {
              withCredentials: true,
            }
          );
          console.log(response)
        //   setUser1(response.data.userResult)
          console.log(user1)
        } catch (error) {
          console.log(error)
        }
      };

    useEffect(() => {
        fetchUser();
      }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Name:</p>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                    <div className="col-span-5 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Email:</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Phone:</p>
                        <p>{user.phone}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Company:</p>
                        <p>{user.company}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Designation:</p>
                        <p>{user.designation}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Employment Type:</p>
                        <p>{user.employmentType}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">Status:</p>
                        <p>{user.status}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-600 font-semibold">User Type:</p>
                        <p>{user.userType}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <Link
                        to={`/updatePassword/${user._id}`}
                        className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-center transition duration-300 ease-in-out"
                    >
                        Change Password
                    </Link>
                    <Link
                        to={`/edit-user/${user._id}`}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-center transition duration-300 ease-in-out"
                    >
                        Update
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
