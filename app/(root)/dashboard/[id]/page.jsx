"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Select from "react-select";

export default function TripDashboard() {
  const { id } = useParams();
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [people, setPeople] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [myTasksOnly, setMyTasksOnly] = useState(false);
  const statusOptions = ["To Pack", "Packed", "Delivered"];
  const [tripDe, setTripDetails] = useState("");
  const [newItem, setNewItem] = useState({
    itemName: "",
    category: "",
    user: "",
    userRole: "",
  });
  const [newPerson, setNewPerson] = useState({ name: "", role: "" });
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    (async () => {
      const storedUser = await localStorage.getItem("user");
      if(!storedUser){
        router.push('/'); // Redirect to dashboard if user is already logged in
      }
      if (storedUser) {
        try {
          const current = JSON.parse(storedUser);
          setCurrentUser(current._id);
          console.log("Current User:", current._id);
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
        }
      } else {
        console.warn("No user found in localStorage");
      }
      await tripDetails();
      await fetchUsers();
      await fetchItems();
      
      // Simulated data
      setItems([
        { itemName: "Tent", user: "Alice" },
        { itemName: "Water Bottles", user: "Bob" },
      ]);
      setPeople([
        { name: "Alice", role: "Leader" },
        { name: "Bob", role: "Member" },
      ]);
    })();
  }, [id]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/items/${id}`);
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();
      console.log("Fetched items:", data);
      setTasks(data.items);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setTotalUsers(data.users);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addItem = async () => {
    if (newItem.itemName && newItem.user && newItem.category && newItem.userRole) {
      const itemExists = items.some(
        (item) => item.itemName === newItem.itemName && item.user === newItem.user
      );
      if (!itemExists) {
        var payload = {
          name: newItem.itemName,
          category: newItem.category,
          assignedTo: newItem.user,
          userRole: newItem.userRole,
          tripId: id,
        };

        try {
          const res = await fetch("/api/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (res.ok) {
            console.log("Item added:", data);
            await fetchItems();
          } else {
            console.error("Failed to add item:", data.message);
          }
        } catch (e) {
          console.error("Error adding item:", e);
        }
      } else {
        alert("Item already exists for this user.");
      }
      setNewItem({ itemName: "", user: "", userRole: "", category: "" });
      setIsItemModalOpen(false);
    }
  };

  const addPerson = async () => {
    if (newPerson.name && newPerson.role) {
      const payload = {
        userId: newPerson.name,
        role: newPerson.role,
        tripId: id,
      };

      try {
        // const res = await fetch("/api/trips/add-person", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(payload),
        // });
        // const data = await res.json();
        // if (res.ok && data.success) {
        //   console.log("Person added:", data);
        //   setPeople((prev) => [...prev, { name: newPerson.name, role: newPerson.role }]);
        // } else {
        //   console.error("Failed to add person:", data.message);
        // }
      } catch (err) {
        console.error("Error calling API:", err);
      }

      setNewPerson({ name: "", role: "" });
      setIsPeopleModalOpen(false);
    }
  };

  // const deleteTask = (index) => {
  //   const updated = [...tasks];
  //   updated.splice(index, 1);
  //   setTasks(updated);
  // };

  const toggleMyTasks = () => setMyTasksOnly((prev) => !prev);

  var displayedTasks = myTasksOnly
    ? tasks.filter(
        (task) => String(task.assignedTo?.id) === String(currentUser)
      )
    : tasks;


    const updateTaskAssignee = async (index, newUserId) => {
      const taskToUpdate = displayedTasks[index];
      
      try {
        const res = await fetch(`/api/items/update-assigne`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: taskToUpdate._id,
            assignedTo: newUserId }),
        });
    
        const data = await res.json();
        console.log("Response data:", data);
        
        if (res.ok) {
          console.log("Assignee updated:", data.item);
          await fetchItems(); 
        } else {
          console.error("Error updating assignee:", data.message);
        }
      } catch (err) {
        console.error("API call error:", err);
      }
    };
    
    const updateTaskStatus = async (index, newStatus) => {
      const taskToUpdate = displayedTasks[index];
    
      try {
        const res = await fetch("/api/items/update-status", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: taskToUpdate._id,
            status: newStatus,
          }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
          console.log("Status updated:", data.item);
          await fetchItems(); // Refresh tasks from DB
        } else {
          console.error("Error updating task status:", data.message);
        }
      } catch (err) {
        console.error("API call error:", err);
      }
    };
    
    
    const editTask = (index) => {
      // Open modal or inline edit logic
    };
    
    const deleteTask = (index) => {
      // const updated = displayedTasks.filter((_, i) => i !== index);
    };

    const tripDetails = async() => {
      try {
        const res = await fetch(`/api/trips/getById?id=${id}`);
        const data = await res.json();
    
        if (data.success) {
          console.log('Fetched trip:', data.data);
          setTripDetails(data.data);
        } else {
          console.error('Trip fetch failed:', data.message);
          return null;
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
        return null;
      }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden p-6">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-violet-600/20 blur-3xl animate-float2"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg rounded-xl shadow-md border border-[#334155]/50 hover:border-[#6366F1]/70 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.3)] p-6 space-y-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          Trip/Event Dashboard - {tripDe ? tripDe?.name : id}
        </h1>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#64748B] text-sm animate-text-pulse">
          Manage your trip tasks and collaborators
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsItemModalOpen(true)}
            className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white px-4 py-2 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30"
          >
            Add Item
          </button>
          <button
            onClick={() => setIsPeopleModalOpen(true)}
            className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white px-4 py-2 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30"
          >
            Add People
          </button>
          <button
            onClick={toggleMyTasks}
            className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white px-4 py-2 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#6366F1]/30"
          >
            {myTasksOnly ? "View All Tasks" : "My Tasks"}
          </button>
        </div>

        {/* Collaborative Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Collaborative Tasks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-md">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border-b">Task Name</th>
                  <th className="p-2 border-b">Assigned To</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedTasks.map((task, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{task.name}</td>
                    <td className="p-2">
                      <select
                        value={task.assignedTo?.id || ""}
                        disabled = {(tripDe.owner != currentUser)}
                        onChange={(e) =>
                          updateTaskAssignee(index, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                      >
                        <option value="">Unassigned</option>
                        {totalUsers.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <select
                        value={task.status || "To Pack"}
                        disabled={String(task?.assignedTo?.id) != String(currentUser)}
                        onChange={(e) =>
                          updateTaskStatus(index, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                      {/* {(tripDe.owner == currentUser) && (
                        <button
                          onClick={() => editTask(index)}
                          className="text-blue-500"
                        >
                          <Pencil size={18} />
                        </button>
                        )} */}
                        {(tripDe.owner == currentUser) && (
                        <button
                          onClick={() => deleteTask(index)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </div>
      </div>

      {/* Add Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div
            className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-6 rounded-xl border border-[#334155]/50 w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Add Item
            </h2>
            <input
              value={newItem.itemName}
              onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
              placeholder="Item Name"
              className="mb-2 w-full p-2 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
            />
            <input
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              placeholder="Category Name"
              className="mb-2 w-full p-2 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
            />
            <Select
              options={totalUsers.map((p) => ({
                label: p.username,
                value: p._id,
              }))}
              value={
                totalUsers
                  .map((p) => ({ label: p.username, value: p._id }))
                  .find((option) => option.value === newItem.user) || null
              }
              onChange={(selected) => {
                setNewItem({ ...newItem, user: selected?.value || "" });
              }}
              placeholder="Search Assigned Username"
              className="mb-4 text-[#CBD5E1]"
              styles={{
                control: (base) => ({
                  ...base,
                  background: 'linear-gradient(to bottom, #1E293B, #1E203A)',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#CBD5E1',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#CBD5E1',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: '#64748B',
                }),
                menu: (base) => ({
                  ...base,
                  background: '#1E293B',
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  background: isFocused ? '#334155' : '#1E293B',
                  color: '#CBD5E1',
                }),
              }}
            />
            <input
              value={newItem.userRole}
              onChange={(e) => setNewItem({ ...newItem, userRole: e.target.value })}
              placeholder="Assigned Role"
              className="mb-4 w-full p-2 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="text-[#64748B] hover:text-[#818CF8] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white px-4 py-1 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add People Modal */}
      {isPeopleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div
            className="bg-gradient-to-br from-[#1E293B]/90 via-[#1E203A]/90 to-[#1E293B]/90 backdrop-blur-lg p-6 rounded-xl border border-[#334155]/50 w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Add Person
            </h2>
            <Select
              options={totalUsers.map((p) => ({
                label: p.username,
                value: p._id,
              }))}
              value={
                totalUsers
                  .map((p) => ({ label: p.username, value: p._id }))
                  .find((option) => option.value === newPerson.name) || null
              }
              onChange={(selected) => {
                setNewPerson({ ...newPerson, name: selected?.value || "" });
              }}
              placeholder="Search Assigned Username"
              className="mb-4 text-[#CBD5E1]"
              styles={{
                control: (base) => ({
                  ...base,
                  background: 'linear-gradient(to bottom, #1E293B, #1E203A)',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#CBD5E1',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#CBD5E1',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: '#64748B',
                }),
                menu: (base) => ({
                  ...base,
                  background: '#1E293B',
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  background: isFocused ? '#334155' : '#1E293B',
                  color: '#CBD5E1',
                }),
              }}
            />
            <input
              value={newPerson.role}
              onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
              placeholder="Role"
              className="mb-4 w-full p-2 bg-gradient-to-b from-[#1E293B] to-[#1E203A] text-[#CBD5E1] border border-[#334155] rounded-xl focus:outline-none focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/50 placeholder:text-[#64748B]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPeopleModalOpen(false)}
                className="text-[#64748B] hover:text-[#818CF8] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addPerson}
                className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] text-white px-4 py-1 rounded-xl hover:from-[#4338CA] hover:via-[#5B5EF0] hover:to-[#7E4DF0] transition-all duration-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -20px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, 25px) rotate(-3deg); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-float1 { animation: float1 18s ease-in-out infinite; }
        .animate-float2 { animation: float2 20s ease-in-out infinite; }
        .animate-text-pulse { animation: text-pulse 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}