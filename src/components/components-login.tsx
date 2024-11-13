import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
export function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (email === 'admin@example.com' && password === 'password') {
        navigate('/admin')
      } else if (
        email === 'gatekeeper@example.com' &&
        password === 'password'
      ) {
        navigate('/gatekeeper')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.log(err)
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the Gate Management System
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-destructive text-center">{error}</div>
          )}
          <Button type="submit" className="w-full">
            <LockClosedIcon className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="px-8 text-center text-sm text-muted-foreground">
          By signing in, you agree to our{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  )
}
