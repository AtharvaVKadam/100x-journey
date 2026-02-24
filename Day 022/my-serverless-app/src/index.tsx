import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => {
  return c.json({ 
    message: "🚀 Hello from the Edge! Cloudflare Worker is live.",
    timestamp: new Date().toISOString()
  })
})

app.get('/api/v1/health', (c) => {
  return c.json({
    status: "healthy",
    environment: "Cloudflare Edge",
    latency: "0ms cold start"
  })
})

export default app