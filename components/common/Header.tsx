"use client";

import { LogOut, Menu, Settings } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import SearchInput from "./SearchInput";

import { useAuthStore } from "@/store/auth.store";
import { Button } from "../ui/button";
import { getInitials } from "@/utils/getInitials";

interface AdminHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

const Header: React.FC<AdminHeaderProps> = ({ title, onMenuClick }) => {
  const {user, logout} = useAuthStore();
  const [query, setQuery] = useState("");
  
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="font-display text-lg font-semibold tracking-tight">
          {title}
        </h1>

        <div className="ml-auto flex items-center gap-3">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search clients, invoices..."
            containerClassName="hidden w-full max-w-xs sm:block"
          />

          <DropdownMenu>
              <DropdownMenuTrigger
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEB30D] font-data text-xs font-semibold text-[#15130B]"
              aria-label="Open account menu"
            >
              {getInitials(user?.name ?? "")}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {user?.email}
                  </p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Button
                variant="ghost"
                size="sm"
                 onClick={()=> logout()}
                  className="flex items-center gap-2 text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
export default Header;
