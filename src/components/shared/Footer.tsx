import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-4">
            <Logo />
            <div className="flex gap-4">
                <a href="#" className="hover:text-primary">About</a>
                <a href="#" className="hover:text-primary">Contact</a>
                <a href="#" className="hover:text-primary">Privacy Policy</a>
            </div>
            <p>&copy; {new Date().getFullYear()} TableTop Touch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
