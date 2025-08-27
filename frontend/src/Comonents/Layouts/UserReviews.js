import React from "react";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Data Analyst",
    review:
      "REDGRAPH has completely transformed how I visualize Excel data. The charts are beautiful and the export feature saves me hours of work!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Chen",
    role: "Project Manager",
    review:
      "I love how easy it is to upload data and instantly see interactive charts. The interface is clean and super intuitive.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Singh",
    role: "Business Consultant",
    review:
      "The ability to share charts directly with clients is a game changer. My team collaboration has improved a lot since using REDGRAPH.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const UserReviews = () => {
  return (
  
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#E94F37]">
          What Our Users Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((user, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{user.review}"</p>
            </div>
          ))}
        </div>
      </div>
  
  );
};

export default UserReviews;
