import express from 'express'
import { validate } from 'express-jsonschema'
import { JSONSchema4 } from 'json-schema'
import connect from '../db'
import { Request, ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { ObjectId } from 'mongodb'

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
  totalTime: number
  totalCost: number
}

const getTimesheet = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Timesheet => {
  const timesheet = req.body as Timesheet
  timesheet.totalTime = timesheet.items.map(i => i.numberOfMinutes).reduce((a,b) => a + b, 0)
  timesheet.totalCost = timesheet.totalTime * timesheet.rate
  return timesheet
}

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

router.get('/', async (req, res) => {
  const db = await connect()
  const timesheets = await db.collection("timesheets").find({}).limit(50).toArray()
  res.json(timesheets)
})

router.get('/:id', async (req, res) => {
  const db = await connect()
  const timesheet = await db.collection("timesheets").findOne({ _id: new ObjectId(req.params.id) })
  if (timesheet) {
    res.json(timesheet)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', validate({ body: TimesheetSchema }), async (req, res) => {
  const timesheet = getTimesheet(req)
  const db = await connect()
  const result = await db.collection("timesheets").insertOne(timesheet)
  res.status(201).send({ id: result.insertedId })
});

router.put('/:id', validate({ body: TimesheetSchema }), async (req, res) => {
  const timesheet = getTimesheet(req)
  const db = await connect()
  const result = await db.collection("timesheets").replaceOne({ _id: new ObjectId(req.params.id) }, timesheet)

  if (result.modifiedCount > 0) {
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

export default router
