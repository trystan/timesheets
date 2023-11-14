import express from 'express'
import timesheets from './routes/timesheets'

const app = express()
const port = process.env.PORT ?? 8080

app.use(express.json())

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
