import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pages } from "@/utils";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { useState } from "react";

const HomePage = () => {
  const [filterString, setFilterString] = useState("");

  const modules = import.meta.glob("@/pages/*.jsx", {
    eager: true,
    import: "meta",
  });
  console.log(modules)

  const filteredModules = Object.entries(modules).filter(([path, meta]) => {
    if (meta.title.toLowerCase().includes(filterString)) return true
    if (meta.description.toLowerCase().includes(filterString)) return true
    return false
  })

  return (
    <div className="container mx-auto px-4 py-8 space-y-9">
      <h1 className="text-4xl font-bold mb-8">Utils Collection</h1>
      <Input
        type="text"
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
        className="text-center shadow"
        placeholder="Use me to search"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map(([path, meta]) => {
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
