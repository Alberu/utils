import { pages } from "@/utils";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Utils Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link to={`/${page.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
              <img
                src={page.thumbnail}
                alt={page.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{page.title}</h3>
              <p className="text-gray-600 mb-2">{page.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
