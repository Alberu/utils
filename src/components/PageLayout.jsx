import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function PageLayout({ children }) {

    const location = useLocation();
    // const location = { pathname: '/more/somethign/andevenmore/hahah' };

    const pathSegments = location?.pathname.split('/').filter(segment => segment);
    // console.log(pathSegments)

    const Breadcrumbs = pathSegments.map((segment, index) => {
        const pathToSegment = `/${pathSegments.slice(0, index + 1).join('/')}`;
        // console.log(pathToSegment)

        return (
            <span key={index} className="flex items-center">
                <ChevronRight /><Link to={pathToSegment}>{decodeURIComponent(segment)}</Link>
            </span>
        );
    });

    console.log(useLocation())
    return (
        <>
            <header></header>
            <main >
                <div className="container mx-auto px-4 py-8 space-y-4">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Link to={'/'}>Utils collection</Link>
                        {Breadcrumbs}
                    </h1>
                    {/* <span className="text-2xl font-bold flex items-center"><a href='/'>Utils collection</a> <ChevronRight /> Money Flow</span> */}
                    <div className="flex justify-center space-y-4">
                        {children}
                    </div>
                </div>
            </main>
            <footer></footer>
        </>
    )
}