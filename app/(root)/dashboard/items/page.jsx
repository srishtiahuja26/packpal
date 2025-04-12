"use client";

import { useState } from "react";

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([{ itemName: "", user: "", role: "" }]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setItems([{ itemName: "", user: "", role: "" }]); // Reset form
  };

  const handleAddItems = () => {
    setItems([...items, { itemName: "", user: "", role: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    const validItems = items.filter(
      (item) => item.itemName && item.user && item.role
    );
    if (validItems.length === items.length) {
      alert(`Items added: ${JSON.stringify(validItems)}`);
      // Add logic here (API etc.)
      closeModal();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create New
        </button>
        <button
          onClick={openModal}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Items
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close X */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Add Items</h2>

            {/* Dynamic Fields */}
            {items.map((item, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) =>
                      handleInputChange(index, "itemName", e.target.value)
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select User
                  </label>
                  <select
                    value={item.user}
                    onChange={(e) =>
                      handleInputChange(index, "user", e.target.value)
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select user</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User Role
                  </label>
                  <select
                    value={item.role}
                    onChange={(e) =>
                      handleInputChange(index, "role", e.target.value)
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select role</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
            ))}

            {/* Add Row */}
            <button
              onClick={handleAddItems}
              className="bg-teal-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Add Items
            </button>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
