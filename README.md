# React wordle with 3 different servers

<img width="749" alt="Screen Shot 2022-03-01 at 8 43 03 PM" src="https://user-images.githubusercontent.com/72945168/156296449-13f66907-b75d-4612-8c50-edb4cccbf93b.png">

## Running locally

### Client (`/client`)

Change directories to client:

```bash
cd client
```

Install dependencies (`node_modules`):

```bash
npm install
```

Run the client application:

```bash
npm run dev
```

### Servers

_All servers do the exact same thing so only 1 server needs to be running at any given time_

#### Springboot (`/servers/springboot`)

Change directories to springboot:

```bash
cd servers/springboot
```

To run springboot server open IDE and run java binaries.

#### Flask (`/servers/flask`)

Change directories to flask:

```bash
cd servers/flask
```

Install flask dependencies:

```py
pip install flask flask-sqlalchemy flask-cors
```

Create the sqlite3 database:

```bash
> python
```

```py
from app import db
db.create_all()
exit()
```

Run the flask server:

```py
python app.py
```

#### Express (`/servers/express`)

Change directories to express:

```bash
cd servers/express
```

Install dependencies (`node_modules`):

```bash
npm install
```

Create database and generate prisma:

```bash
npm run prisma:push
npm run prisma:generate
```

Run express server

```bash
npm start
```
