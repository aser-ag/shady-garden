import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header className="w-full bg-primary text-inverse font-sans h-20 flex items-center shadow-sm">

            <div className="w-full max-w-6xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="font-serif font-bold text-2xl tracking-tight">
                    Shady Garden
                </Link>

                <nav className="flex items-center gap-8 text-base font-semibold">
                    <Link
                        to="/about"
                        className="hover:text-accent transition-colors"
                    >
                        About Us
                    </Link>

                    <Link
                        to="/menu"
                        className="hover:text-accent transition-colors"
                    >
                        Menu
                    </Link>
                </nav>

                <div className="flex items-center gap-6 text-base font-semibold">
                    <Link
                        to="/reservations"
                        className="bg-accent hover:bg-amber-400 text-foreground px-5 py-2.5 rounded shadow transition-all active:scale-95"
                    >
                        Book a Table
                    </Link>

                    <Link
                        to="/profile"
                        className="hover:text-accent transition-colors"
                    >
                        Profile
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;