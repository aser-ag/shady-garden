import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-secondary text-inverse font-sans mt-auto pt-12 pb-8 flex flex-col items-center shadow-sm">

            <div className="w-full max-w-6xl mx-auto px-6 flex justify-between items-start">

                <div className="flex flex-col items-start gap-4 text-base">
                    <h3 className="font-serif text-xl font-bold text-accent">Shady Garden</h3>

                    <div className="text-sm text-inverse space-y-2">
                        <p>123 Botanical Avenue, Oasis City</p>
                        <p>hello@shadygarden.com</p>
                        <p>+1 (555) 019-2834</p>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-4 text-base">
                    <h3 className="font-bold uppercase tracking-widest text-accent">Hours of Operation</h3>

                    <div className="text-sm text-inverse space-y-2">
                        <p>Monday - Thursday: 4:00 PM - 10:00 PM</p>
                        <p>Friday - Saturday: 4:00 PM - 11:00 PM</p>
                        <p>Sunday: 11:00 AM - 9:00 PM (Brunch)</p>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-4 text-base">
                    <h3 className="font-bold uppercase tracking-widest text-accent">Quick Links</h3>

                    <nav className="flex flex-col text-sm text-inverse space-y-2">
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>

                        <Link to="/menu" className="hover:text-accent transition-colors">Our Menu</Link>

                        <Link to="/reservations" className="hover:text-accent transition-colors">Book a Table</Link>
                    </nav>
                </div>
            </div>

            <div className="w-full max-w-6xl mx-auto px-6 border-t border-white/10 mt-16 pt-6 text-center text-xs text-white/50">
                <p>© {new Date().getFullYear()} Shady Garden. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;