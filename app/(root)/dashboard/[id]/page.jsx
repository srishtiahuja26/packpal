"use client";

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
      if (storedUser) {
        try {
          const current = JSON.parse(storedUser);
          setCurrentUser(current._id);
          console.log("Current User:", current._id); // use current._id directly
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
        }
      } else {
        console.warn("No user found in localStorage");
      }

      await fetchUsers();
      await fetchItems();

      // Simulated data (optional for initial mock state)
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
      //id
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
    if (
      newItem.itemName &&
      newItem.user &&
      newItem.category &&
      newItem.userRole
    ) {
      const itemExists = items.some(
        (item) =>
          item.itemName === newItem.itemName && item.user === newItem.user
      );
      if (!itemExists) {
        // setItems([...items, newItem]);
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
  
  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const toggleMyTasks = () => setMyTasksOnly((prev) => !prev);

  const displayedTasks = myTasksOnly
    ? tasks.filter(
        (task) => String(task.assignedTo?.id) === String(currentUser)
      )
    : tasks;
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold">Trip/Event Dashboard - {id}</h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsItemModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Item
          </button>
          <button
            onClick={() => setIsPeopleModalOpen(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
          >
            Add People
          </button>
          <button
            onClick={toggleMyTasks}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {myTasksOnly ? "View All Tasks" : "My Tasks"}
          </button>
        </div>

        {/* Collaborative Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Collaborative Tasks</h2>
          <ul className="space-y-2">
            {displayedTasks.map((task, index) => (
              <li
                key={index}
                className="border p-2 rounded-md flex justify-between items-center"
              >
                <span>
                  {task.name} —{" "}
                  <strong>
                    {Array.isArray(task.assignedTo)
                      ? task.assignedTo.map((user) => user.username).join(", ")
                      : typeof task.assignedTo === "object" &&
                        task.assignedTo !== null
                      ? task.assignedTo.username
                      : task.assignedTo || "Unassigned"}
                  </strong>
                </span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded-lg w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-amber-800">Add Item</h2>
            <input
              value={newItem.itemName}
              onChange={(e) =>
                setNewItem({ ...newItem, itemName: e.target.value })
              }
              placeholder="Item Name"
              className="mb-2 w-full p-2 border rounded text-zinc-950"
            />
            <input
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              placeholder="category Name"
              className="mb-2 w-full p-2 border rounded text-amber-700"
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
              className="mb-4 text-amber-700"
            />
            <input
              value={newItem.userRole}
              onChange={(e) =>
                setNewItem({ ...newItem, userRole: e.target.value })
              }
              placeholder="Assigned Role"
              className="mb-4 w-full p-2 border rounded text-amber-700"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="bg-blue-500 text-white px-4 py-1 rounded"
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
            className="bg-white p-6 rounded-lg w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add Person</h2>
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
                setNewPerson({ ...newItem, name: selected?.value || "" });
              }}
              placeholder="Search Assigned Username"
              className="mb-4 text-amber-700"
            />
            
            <input
              value={newPerson.role}
              onChange={(e) =>
                setNewPerson({ ...newPerson, role: e.target.value })
              }
              placeholder="Role"
              className="mb-4 w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPeopleModalOpen(false)}
                className="text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addPerson}
                className="bg-purple-500 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
