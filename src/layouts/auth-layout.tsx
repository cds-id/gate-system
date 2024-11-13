import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-1 flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  )
}
