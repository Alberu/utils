import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pages } from "@/utils";
import { Link } from "react-router-dom";

const HomePage = () => {
  const modules = import.meta.glob("@/pages/*.jsx", {
    eager: true,
    import: "meta",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Utils Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(modules).map(([path, meta]) => {
          return (
            <Link key={path} to={`/${meta.title}`} className="block">
              <Card>
                <CardHeader>
                  <CardTitle>{meta.title}</CardTitle>
                </CardHeader>
                <CardContent>{meta.description}</CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
