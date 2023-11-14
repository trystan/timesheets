## To install prerequisites

```
choco install mongodb
npm install
```

or

```
brew install mongodb
npm install
```

## To build

```
npm run build
```

## To run

```
npm run start
```

There are `PORT` and `MONGO_CONNECTION` environment variables.


## Routes

### GET /timesheets

```
curl.exe http://localhost:8080/timesheets
```

### GET /timesheets/:id

```
curl.exe http://localhost:8080/timesheets/6553b37552e3275688ce4cfd
```

### POST /timesheets

```
curl.exe -X POST -H "Content-Type: application/json" -d '{\"name\":\"test\",\"description\":\"test\",\"rate\":10,\"items\":[{\"date\":\"2023-01-01\",\"numberOfMinutes\":20}]}' http://localhost:8080/timesheets
```

### PUT /timesheets/:id

```
curl.exe -X PUT -H "Content-Type: application/json" -d '{\"name\":\"test\",\"description\":\"test\",\"rate\":10,\"items\":[{\"date\":\"2023-01-01\",\"numberOfMinutes\":20}]}' http://localhost:8080/timesheets/6553b37552e3275688ce4cfd
```
