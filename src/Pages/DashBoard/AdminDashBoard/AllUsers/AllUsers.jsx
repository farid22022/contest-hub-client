import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data : users =[], refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users',{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
              }
            });
            return res.data
        }
    })
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "This User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = (user) =>{
      axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleMakeCreator = (user) =>{
      axiosSecure.patch(`/users/creator/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Contest Creator Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table ">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Creator</th>
        <th>User Details</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user, index) =><tr
        key={user._id}>
            <th>
                {index+1}
            </th>
            <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={user?.imageURL} alt="Avatar Tailwind CSS Component" />
                </div>
                </div>
                <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-sm opacity-50">User</div>
                </div>
            </div>
            </td>
            <td>
            {user.email}
            <br/>
            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>
                <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                </button>
            </td>
            <th>
                {
                  !(user.isAdmin === 'admin') ?
                  <button onClick={() =>handleMakeAdmin(user)} className="btn btn-ghost btn-xs pb-3 pt-1 bg-red-600"> Make Admin</button>
                  :
                  <button>Admin</button>
                }
            </th>
            <th>
                {
                  !(user.isCreator === 'creator') ?
                  <button onClick={() =>handleMakeCreator(user)} className="btn btn-ghost btn-xs pb-3 pt-1 bg-red-600"> Make Creator</button>
                  :
                  <button>Contest Creator</button>
                }
            </th>
      </tr>)
      }
      
      
      
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default AllUsers;