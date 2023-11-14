import express from 'express'

const app = express()
const port = process.env.PORT ?? 8080

app.use(express.json())

interface LineItem {
  date: Date
  numberOfMinutes: number
}

interface Timesheet {
  id: number
  name: string
  description: string
  items: LineItem[]
  rate: number
}

const timesheets: Timesheet[] = []

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/timesheets', (req, res) => {
  res.json(timesheets);
});

app.post('/timesheets', (req, res) => {
  const timesheet = { id: timesheets.length, ...req.body }
  timesheets.push(timesheet)
  res.sendStatus(201)
});

app.put('/timesheets/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const updatedTimesheet = { ...req.body }
  const index = timesheets.findIndex(t => t.id === id)
  if (index > -1) {
    timesheets.splice(index, 1, updatedTimesheet)
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
});

app.get('/timesheets/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  res.json(timesheets.find(t => t.id === id));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
