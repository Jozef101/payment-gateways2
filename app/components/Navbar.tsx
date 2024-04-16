"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

const links = [
    { name: 'Home', href: '/'},
    { name: 'Červené vína', href: '/Cervene-vina'},
    { name: 'Biele vína', href: '/Biele-vina'},
    { name: 'Ružové vína', href: '/Ruzove-vina'}
]

export default function Navbar() {
    const pathname = usePathname()
    const {handleCartClick} = useShoppingCart()
    return (
        <header className="mb-8 border-b">
            <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                <Link href='/'>
                    <h1 className="text-4xl font-bold">WineStore</h1>
                </Link>
                <nav className="hidden gap-12 lg:flex 2xl:ml-16">
                    {links.map((link, index) => (
                        <div key={index}>
                            {pathname === link.href ? (
                                <Link href={link.href} className="text-lg font-semibold text-primary">
                                    {link.name}
                                </Link>
                            ) : (
                                <Link href={link.href} className="text-lg font-semibold text-gray-400 transition duration-100 hover:text-primary">
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>                
                <div className="flex divide-x border-r sm:border-l">
                    <Button
                        onClick={() => handleCartClick()} 
                        className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 md:w-24 rounded-none">
                        <ShoppingBag />
                    
                    <span className="hidden text-m font-semibold text-gray-100 sm:block">
                        Košík
                    </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}