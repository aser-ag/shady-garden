import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="bg-background">
            </main>

            <Footer />
        </div>
    );
};

export default Layout;