"use client"
import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"



export function Logout() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/auth/logout');
            const data = response
            if (response.status === 200) {
                localStorage.removeItem('authData')
                router.push('/login')
            } else {
                console.log(`Logout failed with status: ${response.status}`);
            }

        } catch (e) {
            console.error(e);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-0 hover:bg-[#fff] dark:hover:bg-[#313338]" size="icon">
                    <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-black  dark:text-white" />
                    <span className="sr-only">Logout</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
