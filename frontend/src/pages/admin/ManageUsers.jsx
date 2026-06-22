import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch users from the API
  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await getAllUsers();
      console.log("Fetched users:", userData);
      setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h2>

      {/* Responsive Container: Switches between Grid and Table based on screen size */}
      <div className="overflow-x-auto">

        {/* Mobile View: Display users as cards */}
        <div className="md:hidden grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {user.role}
                </span>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Display users in a standard table */}
        <table className="hidden md:table w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{user.name}</td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers;