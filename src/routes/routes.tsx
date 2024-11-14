import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/auth-layout'
import DashboardLayout from '@/layouts/dashboard-layout'
import { LoginComponent } from '@/components/components-login'
import { AdminDashboard } from '@/pages/admin/dashboard'
import { GatekeeperDashboard } from '@/pages/gatekeeper/dashboard'
import { GatekeeperKiosk } from '@/pages/gatekeeper/kiosk'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <LoginComponent />,
      },
      {
        path: 'login',
        element: <LoginComponent />,
      },
    ],
  },
  {
    path: '/admin',
    element: <DashboardLayout userType="admin" />,
    children: [
      {
        path: '',
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: '/gatekeeper',
    element: <DashboardLayout userType="gatekeeper" />,
    children: [
      {
        path: '',
        element: <GatekeeperDashboard />,
      },
      {
        path: 'kiosk',
        element: <GatekeeperKiosk />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
