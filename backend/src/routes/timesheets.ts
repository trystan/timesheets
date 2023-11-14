import express from 'express'
import { validate } from 'express-jsonschema'
import { JSONSchema4 } from 'json-schema'

const router = express.Router()

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

const TimesheetSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    rate: { type: 'number', required: true },
    items: {
      type: "array", required: true,
      items: {
        properties: {
          date: { type: 'string', format: 'date', required: true },
          numberOfMinutes: { type: 'number', required: true }
        },
      }
    }
  }
}

router.get('/', (req, res) => {
  res.json(timesheets);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const timesheet = timesheets.find(t => t.id === id)
  if (timesheet) {
    res.json(timesheet);
  } else {
    res.sendStatus(404)
  }
});

router.post('/', validate({ body: TimesheetSchema }), (req, res) => {
  const timesheet = { ...req.body, id: timesheets.length }
  timesheets.push(timesheet)
  res.sendStatus(201)
});

router.put('/:id', validate({ body: TimesheetSchema }), (req, res) => {
  const id = parseInt(req.params.id, 10)
  const updatedTimesheet = { ...req.body, id }
  const index = timesheets.findIndex(t => t.id === id)
  if (index > -1) {
    timesheets.splice(index, 1, updatedTimesheet)
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
});

export default router
