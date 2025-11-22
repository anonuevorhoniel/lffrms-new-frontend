"use client";

import * as React from "react";
import { GiFarmer } from "react-icons/gi";
import { PiPlantDuotone } from "react-icons/pi";
import { GalleryVerticalEnd, LayoutDashboard } from "lucide-react";
import { IoDocumentText } from "react-icons/io5";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "LFFRMS",
      logo: GalleryVerticalEnd,
      plan: "FAES-oPAG",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Farmer and Profiles",
      icon: GiFarmer,
      items: [
        {
          title: "Farmers",
          url: "/farmers",
        },
        {
          title: "Profilings",
          url: "/profilings",
        },
        {
          title: "Mayors",
          url: "/mayors",
        },
      ],
    },
    {
      title: "Farm Management",
      icon: PiPlantDuotone,
      items: [
        {
          title: "Crop Categories",
          url: "/crop-categories",
        },
        {
          title: "Assistance Histories",
          url: "/assistance-histories",
        },
        {
          title: "Assistances",
          url: "/assistances",
        },
        {
          title: "Machines",
          url: "/machines",
        },
        {
          title: "Funds",
          url: "/funds",
        },
        {
          title: "Post Harvests",
          url: "/post-harvests",
        },
        {
          title: "Associations",
          url: "/associations",
        },
        {
          title: "Trainings",
          url: "/trainings",
        },
      ],
    },
    {
      title: "Documents",
      icon: IoDocumentText,
      items: [
        {
          title: "Certificates",
          url: "/certificates",
        },
        {
          title: "Reports",
          url: "/reports",
        },
        {
          title: "Accomplishments",
          url: "/accomplishments",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
