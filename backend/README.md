## To build

```
npm run build
```

## To run

```
npm run start
```

get timesheets
```
curl.exe http://localhost:8080/timesheets
```

post a timesheet
```
curl.exe -X POST -H "Content-Type: application/json" -d '{\"name\":\"test\",\"description\":\"test\",\"rate\":10,\"items\":[{\"date\":\"2023-01-01\",\"numberOfMinutes\":20}]}' http://localhost:8080/timesheets
```