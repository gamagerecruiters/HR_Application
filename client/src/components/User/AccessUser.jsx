import axios from "axios"

const AccessUser = () => {


  const handleClick = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get('http://localhost:8800/api-v1/user/get-user/65fa9575cfdc88a062b2494e' , {
          withCredentials: true
        });
        // setUsers(response.data.users);
        console.log(response)
      } catch (error) {
        console.log('Error fetching users:', error);
        // Handle error here
      }
  };



  return (
    <div>
      <button onClick={handleClick}>Check Other User Access</button>
    </div>
  );
};

export default AccessUser;
