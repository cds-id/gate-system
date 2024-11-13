import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/auth-layout'
import DashboardLayout from '@/layouts/dashboard-layout'
import { LoginComponent } from '@/components/components-login'
import { AdminDashboard } from '@/pages/admin/dashboard'
import { GatekeeperDashboard } from '@/pages/gatekeeper/dashboard'

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
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: '/gatekeeper',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <GatekeeperDashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
