import React, { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  BellIcon,
  CogIcon,
} from '@heroicons/react/24/outline'
import { DocumentIcon } from '@heroicons/react/20/solid'
import { MenuIcon, XIcon } from 'lucide-react'

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

type DashboardLayoutProps = {
  userType: 'admin' | 'gatekeeper'
}

const adminNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Students', href: '/admin/students', icon: UsersIcon },
  { name: 'Scheduling', href: '/admin/scheduling', icon: CalendarIcon },
  { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
  { name: 'Reports', href: '/admin/reports', icon: DocumentIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
]

const gatekeeperNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/gatekeeper', icon: HomeIcon },
  { name: 'Daily Tasks', href: '/gatekeeper/daily-tasks', icon: CalendarIcon },
  { name: 'Gatekeeping', href: '/gatekeeper/gatekeeping', icon: UsersIcon },
  {
    name: 'Activity Log',
    href: '/gatekeeper/activity-log',
    icon: DocumentIcon,
  },
]

export default function DashboardLayout({ userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navItems = userType === 'admin' ? adminNavItems : gatekeeperNavItems

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for mobile */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 z-50 flex md:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex flex-col w-full max-w-xs bg-background">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="flex items-center h-16 px-6 border-b">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Visitor Management System"
            />
          </div>
          <ScrollArea className="flex-1">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  } group flex items-center px-3 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      location.pathname === item.href
                        ? 'text-accent-foreground'
                        : 'text-muted-foreground group-hover:text-accent-foreground'
                    } mr-4 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r bg-background">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-6 bg-card border-b">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Visitor Management System"
              />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <ScrollArea className="py-4 px-4">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                    >
                      <item.icon
                        className={`${
                          location.pathname === item.href
                            ? 'text-accent-foreground'
                            : 'text-muted-foreground group-hover:text-accent-foreground'
                        } mr-3 flex-shrink-0 h-5 w-5`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full md:w-0 md:flex-1 overflow-hidden">
        <div className="relative z-10 flex h-16 bg-card border-b">
          <Button
            variant="ghost"
            size="icon"
            className="px-4 absolute left-0 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Button>
          <div className="flex-1 px-4 flex justify-center md:justify-between">
            <div className="flex-1 flex justify-center md:justify-start">
              {/* Add search functionality here if needed */}
            </div>
            <div className="ml-4 hidden md:flex items-center">
              {/* Add profile dropdown or other header items here */}
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
