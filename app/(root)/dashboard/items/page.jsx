"use client";

import { useState } from "react";

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([{ itemName: "", user: "" }]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setItems([{ itemName: "", user: "" }]); // Reset to initial state
  };

  const handleAddItems = () => {
    setItems([...items, { itemName: "", user: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = () => {
    const validItems = items.filter((item) => item.itemName && item.user);
    if (validItems.length === items.length) {
      alert(`Items added: ${JSON.stringify(validItems)}`);
      // Add your logic here to handle the submission (e.g., API call)
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

      {/* Modal Overlay with darker dim and cross button */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-[400px] z-60"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close (X) icon */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Add Items</h2>

            {/* Dynamic Rows */}
            {items.map((item, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name (Items)
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
                  <input
                    type="text"
                    value={item.user}
                    onChange={(e) =>
                      handleInputChange(index, "user", e.target.value)
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter user name"
                  />
                </div>
              </div>
            ))}

            {/* Add Items Button */}
            <button
              onClick={handleAddItems}
              className="bg-teal-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Add Items
            </button>

            {/* Submit Button */}
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
