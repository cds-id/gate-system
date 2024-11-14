import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

type VisitorRecord = {
  id: string
  name: string
  purpose: string
  timestamp: string
}

export function GatekeeperKiosk() {
  const [visitorName, setVisitorName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [records, setRecords] = useState<VisitorRecord[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckIn = async () => {
    setIsProcessing(true)
    try {
      // Simulate an API call that might fail
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly throw an error
          if (Math.random() < 0.5) {
            reject(new Error('Failed to process check-in'))
          }
          resolve(true)
        }, 1000)
      })

      const newRecord: VisitorRecord = {
        id: Math.random().toString(36).substr(2, 9),
        name: visitorName,
        purpose: purpose,
        timestamp: new Date().toLocaleString(),
      }

      setRecords((prev) => [newRecord, ...prev])
      setVisitorName('')
      setPurpose('')
    } catch (error) {
      console.log(error)
      // This error will be caught by Sentry
      throw new Error('Unexpected error during visitor check-in')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleForceError = () => {
    // This will trigger an error that Sentry will capture
    throw new Error('Manually triggered error in Kiosk page')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visitor Check-In Kiosk</h1>
        <Button
          variant="destructive"
          onClick={handleForceError}
          className="hidden md:block" // Hide on mobile for safety
        >
          Simulate Error
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Visitor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitorName">Visitor Name</Label>
            <Input
              id="visitorName"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Enter visitor name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter purpose of visit"
            />
          </div>
          <Button
            onClick={handleCheckIn}
            disabled={!visitorName || !purpose || isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : 'Check In Visitor'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No recent check-ins
              </p>
            ) : (
              records.map((record) => (
                <div
                  key={record.id}
                  className="flex justify-between items-start border-b py-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{record.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.purpose}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {record.timestamp}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
