import React from "react";
import { useForm, useWatch } from "react-hook-form";

const About = () => {
  const [users, setUsers] = React.useState([
    { name: "mahesh", _id: 1, age: "23" },
    { name: "vikash", _id: 2, age: "24" },
    { name: "navin", _id: 3, age: "23" },
    { name: "rahul", _id: 4, age: "23" },
    { name: "shraddha", _id: 5, age: "23" },
    { name: "rohit", _id: 6, age: "23" },
  ]);

  // State to hold the selected users
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      // Remove user from selected list if unchecked
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      // Add user to selected list if checked
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  console.log(selectedUsers);

  // Handle bulk delete
  const handleDelete = () => {
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user._id)
    );
    console.log(updatedUsers);
    setUsers(updatedUsers); // Update the users list
    setSelectedUsers([]); // Clear the selected users
  };

  // ______REACT HOOK FORM CHECKBOX_________

  // Initialize React Hook Form
  // const { register, handleSubmit, watch, reset } = useForm();

  // Watch checkbox values
  // const selectedCheckboxes = watch("interests", []);

  // console.log("selectedCheckboxes", selectedCheckboxes);

  // Handle form submission
  // const onSubmit = (data) => {
  //   console.log("Selected values:", data); // Logs an array of selected checkboxes
  //   reset();
  // };

  // ______REACT HOOK FORM CHECKBOX_________


  return (
    <div className="bg-green-600 w-full h-screen flex justify-center items-center">
      <div className="bg-black text-white p-2 text-2xl">
        <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li key={user?._id} className="flex gap-2">
              <input
                type="checkbox"
                className="w-6 cursor-pointer"
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleCheckboxChange(user._id)}
              />
              {user.name}
            </li>
          ))}
        </ul>
        <button
          className="bg-red-600 text-white"
          onClick={handleDelete}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected Users
        </button>
      </div>
    </div>

    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="p-4 bg-gray-600 gap-4 text-white w-[380px] flex flex-col"
    // >
    //   <h2>Select Your Interests:</h2>
    //   <input
    //     className="p-4 text-green-700"
    //     type="text"
    //     name="name"
    //     placeholder="Enter youre name........"
    //     {...register("name")}
    //   />
    //   <input
    //     className="p-4 text-green-700"
    //     type="email"
    //     name="email"
    //     placeholder="Enter youre email........"
    //     {...register("email")}
    //   />
    //   <div className="grid grid-cols-2 gap-5">
    //     <label className="flex items-center gap-2 text-2xl">
    //       <input
    //         className="w-8 h-8 cursor-pointer"
    //         type="checkbox"
    //         value="Sports"
    //         {...register("interests")}
    //       />
    //       Sports
    //     </label>
    //     <label className="flex items-center gap-2 text-2xl">
    //       <input
    //         className="w-8 h-8 cursor-pointer"
    //         type="checkbox"
    //         value="Music"
    //         {...register("interests")}
    //       />
    //       Music
    //     </label>
    //     <label className="flex items-center gap-2 text-2xl">
    //       <input
    //         className="w-8 h-8 cursor-pointer"
    //         type="checkbox"
    //         value="Movies"
    //         {...register("interests")}
    //       />
    //       Movies
    //     </label>
    //     <label className="flex items-center gap-2 text-2xl">
    //       <input
    //         className="w-8 h-8 cursor-pointer"
    //         type="checkbox"
    //         value="Art"
    //         {...register("interests")}
    //       />
    //       Art
    //     </label>
    //   </div>
    //   <div className="flex gap-[88px]">
    //     <label className="flex items-center gap-2 text-2xl">
    //       <input
    //         className="w-8 h-8 cursor-pointer"
    //         type="radio"
    //         value="Male"
    //         {...register("gender")}
    //       />
    //       Male
    //     </label>
    //     <label className="flex items-center gap-2 text-2xl">
    //       <input
    //         className="w-8 h-8 cursor-pointer"
    //         type="radio"
    //         value="Female"
    //         {...register("gender")}
    //       />
    //       Female
    //     </label>
    //   </div>
    //   <div>
    //     <button className="bg-red-600 w-64 p-3 text-white" type="submit">
    //       Submit
    //     </button>
    //   </div>

    //   {/* Display selected checkboxes */}
    //   {/* <div>
    //     <h3>Selected Interests:</h3>
    //     <ul>
    //       {selectedCheckboxes.map((interest, index) => (
    //         <li key={index}>{interest}</li>
    //       ))}
    //     </ul>
    //   </div> */}
    // </form>
  );
};

export default About;
