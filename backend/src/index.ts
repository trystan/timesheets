import express from 'express'
import { validate } from 'express-jsonschema'
import { JSONSchema4 } from 'json-schema'

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

const TimesheetSchema: JSONSchema4 = {
  type: 'object',
  properties: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    rate: { type: 'number', required: true },
    items: {
      type: "array",
      items: {
        properties: {
          date: { type: 'string', format: 'date', required: true },
          numberOfMinutes: { type: 'number', required: true }
        },
      }
    }
  }
}

app.post('/timesheets', validate({ body: TimesheetSchema }), (req, res) => {
  const timesheet = { id: timesheets.length, ...req.body }
  timesheets.push(timesheet)
  res.sendStatus(201)
});

app.put('/timesheets/:id', validate({ body: TimesheetSchema }), (req, res) => {
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

app.use((err: any, req: any, res: any, next: any) => {
 
  var responseData;

  if (err.name === 'JsonSchemaValidation') {
      console.log(err.message);
      res.status(400);

      responseData = {
         statusText: 'Bad Request',
         jsonSchemaValidation: true,
         validations: err.validations  // All of your validation information
      };

      if (req.xhr || req.get('Content-Type') === 'application/json') {
          res.json(responseData);
      } else {
          res.render('badrequestTemplate', responseData)
      }
  } else {
      next(err)
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
