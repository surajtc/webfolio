"use client";

import {
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  BotMessageSquareIcon,
  CircleHelpIcon,
  CodeIcon,
  MessageCircleIcon,
  MicIcon,
  RadioIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { TeamSwitcher } from "./team-switcher";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";

const items = [
  {
    title: "Chat",
    url: "#",
    icon: MessageCircleIcon,
    active: true,
  },
  {
    title: "Real-time",
    url: "#",
    icon: RadioIcon,
  },
  {
    title: "Assistants",
    url: "#",
    icon: BotMessageSquareIcon,
  },
  {
    title: "Audio",
    url: "#",
    icon: MicIcon,
  },
  {
    title: "Documentation",
    url: "#",
    icon: CodeIcon,
  },
];

const moreItems = [
  {
    title: "Help Center",
    url: "#",
    icon: CircleHelpIcon,
  },
  {
    title: "Community",
    url: "#",
    icon: UsersIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Playground</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "text-muted-foreground",
                      item.active ? "text-foreground bg-accent" : "",
                    )}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {moreItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-muted-foreground">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppNavbar() {
  const navItems = ["Playground", "Dashboard", "Docs", "API Reference"];

  return (
    <nav className="flex items-center justify-between py-3">
      <SidebarTrigger />

      <div className="flex items-center gap-8">
        <div className="flex items-center text-sm text-muted-foreground/80 [&>*:first-child]:text-foreground">
          {navItems.map((label, i, arr) => (
            <Link
              key={label}
              href="#"
              className="hover:text-foreground inline-flex items-center"
            >
              {label}
              {i < arr.length - 1 && (
                <span className="px-4 !text-muted-foreground/80">/</span>
              )}
            </Link>
          ))}
        </div>
        <UserAvatar />
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="rounded-none !shadow-none bg-sidebar">
        <AppNavbar />
        <section className="bg-background rounded h-full">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
