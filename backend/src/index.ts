import express from 'express'
import timesheets from './routes/timesheets'

const app = express()
const port = process.env.PORT ?? 8080

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/timesheets', timesheets)

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === 'JsonSchemaValidation') {
    console.log(err.message);
    res.status(400);

    res.json({
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations
    })
  } else {
    next(err)
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
