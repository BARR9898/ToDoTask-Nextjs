// /app/navbar.js
'use client';
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { GalleryHorizontal ,Plus,LogOut,Users,List} from 'lucide-react';
export default function Navbar() {
  function handleLogout() {
    console.log('saliendo');
    
    signOut({ callbackUrl: "/auth/login" })
  }
  return (
    <nav className='w-100 h-24 bg-zinc-50  shadow-lg'>
      <ul className='flex justify-between items-center h-full space-x-1'>
        <button className='w-32 h-16 bg-blue-600 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center'><Link href="/admin/tasks"><List className='text-white'></List></Link></button>
        <button className='w-32 h-16 bg-blue-600 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center'><Link href="/admin/tasks/new"><Plus className='text-white'></Plus></Link></button>
        <button className='w-32 h-16 bg-blue-600 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center' ><Link href="/admin/users" ><Users className='text-white'></Users></Link></button>
        <button className='w-32 h-16 bg-blue-600 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center' onClick={handleLogout}><Link href="/" ><LogOut className='text-white'></LogOut></Link></button>
      </ul>
    </nav>
  );
}
