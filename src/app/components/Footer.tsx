import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="w-full bg-background border-t">
            <div className="container px-4 py-8 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">SAPT Janam</h3>
                        <p className="text-sm text-muted-foreground">
                            Empowering your digital journey with innovative solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                                    Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                                <Facebook size={20} />
                            </Link>
                            <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                                <Twitter size={20} />
                            </Link>
                            <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-4 border-t text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} SAPT Janam. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer