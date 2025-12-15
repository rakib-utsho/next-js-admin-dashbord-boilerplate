"use client";
import * as React from "react";
import { logout } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleQuestionMark, LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Logo from "@/assets/logo/Logo.png";
import Cookies from "js-cookie";

export function TeamSwitcher({
  teams,
}: {
  teams: { name: string; logo: React.ElementType }[];
}) {
  const [activeTeam] = React.useState(teams[0]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      router.push("/");
      router.refresh(); // Optional: refresh to clear any cached data
    }, 300);
  };

  if (!activeTeam) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Sidebar top logo */}
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex justify-center items-center p-4 ">
            <Image
              src={Logo}
              alt="logo"
              width={150}
              height={50}
              className=" p-4 shadow-2xl rounded-2xl bg-[#EFEFEF]/10"
            />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Logout button fixed at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpen(true)}
              className="text-white bg-[#AD651D]/80 rounded-xl py-6 w-full text-base sm:text-lg font-medium hover:bg-[#AD651D] transition cursor-pointer hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      {/* Logout confirmation modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" sm:max-w-md bg-[#FFFFFF] text-center text-[#68182E] flex flex-col justify-center items-center mx-auto">
          <DialogHeader className="w-full mx-auto justify-center items-center">
            <div className="flex justify-center mb-2">
              <CircleQuestionMark className="w-30 h-30 text-[#D52D2D]" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Are You Sure?
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Do you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4 mt-4">
            <Button
              onClick={handleLogout}
              className="flex-1 py-3 px-6 bg-gradient-to-b from-transparent from-0% via-[#1E1E24] via-10% to-[#1E1E24] to-100% text-[#CFFD4C] hover:bg-[#68182E]/60 shadow-2xl hover:text-[#CFFD4C] rounded-full font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              Log Out
            </Button>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-transparent border border-[#DE251F] 
             text-[#DE251F] hover:bg-[#DE251F] hover:text-white 
             transition-colors duration-300 ease-in-out py-3 px-6 font-medium cursor-pointer"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
