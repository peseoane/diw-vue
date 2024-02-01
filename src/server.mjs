import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';

const app = express();
const server = createServer(app);

app.use(morgan('dev'));
app.use(express.json());

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`);
})