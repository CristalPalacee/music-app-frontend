"use client";
import Link from "next/link";

import { useState } from "react";
import {
  Home,
  Search,
  Library,
  Clock,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


export default function Sidebar() {
  const [open, setOpen] = useState(false); // mobile open
  const [collapsed, setCollapsed] = useState(false); // desktop collapse

  return (
    <>
      {/* === MOBILE BUTTON === */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-3 fixed top-4 left-4 z-50 text-white backdrop-blur-xl rounded-lg"
      >
        <Menu size={32} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* === SIDEBAR === */}
      <aside
        className={`
          fixed top-0 left-0 h-full
          bg-black/20 backdrop-blur-lg border-r border-white/20 text-white
          flex flex-col py-8 px-4
          transition-all duration-300 z-50
          
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

          ${collapsed ? "md:w-30" : "md:w-65"}
        `}
      >
        {/* === DESKTOP COLLAPSE BUTTON === */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-4 top-6 
                     bg-black/50 border border-white/20 p-1 rounded-full"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={20} />}
        </button>

        {/* === TITLE === */}
        {!collapsed && (
          <h1 className="text-3xl text-center font-bold mb-12 tracking-wide">Mymusik</h1>
        )}

        {/* === MENU ITEMS === */}
        <nav className="space-y-4">
          <MenuItem
           href="/"
            icon={<Home size={20} />}     // IKON LEBIH BESAR
            label="Home"
            collapsed={collapsed}
            open={open}
            setCollapsed={setCollapsed}
            active
          />
          <MenuItem  href="/contact" icon={<Search size={20} />} label="Explore" collapsed={collapsed} open={open} setCollapsed={setCollapsed} />
          <MenuItem  href="/" icon={<Library size={20} />} label="Pustaka" collapsed={collapsed} open={open} setCollapsed={setCollapsed} />
          <MenuItem  href="/" icon={<Clock size={20} />} label="History" collapsed={collapsed} open={open} setCollapsed={setCollapsed} />
        </nav>
       
      </aside>
    </>
  );
}

/* === MENU ITEM === */
function MenuItem({
  icon,
  label,
  collapsed,
  active,
  setCollapsed,
  href,
  open
  
}: {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
   href: string;
   open: boolean; 
  setCollapsed: (v: boolean) => void;
}) {
  return (
   
    <Link
      href={href}
      onClick={() => {
        if (collapsed) setCollapsed(false); // buka saat menu diklik
      }}
      className={`
        flex flex-col items-center justify-center
        px-2 py-4 rounded-xl cursor-pointer select-none
        transition-all text-center
        
        ${active ? "bg-red-600/50 text-white" : "hover:bg-white/10 text-neutral-200"}
      `}
    >
      {/* ICON */}
      <div className="flex justify-center">{icon}</div>

      {/* TEXT SELALU ADA DI BAWAH ICON */}
      <span className="mt-2 text-base font-medium">{label}</span>
    </Link>
 
  );
}
