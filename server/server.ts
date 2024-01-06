import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import multer from 'multer';
import { parseLines } from './service';

const app: Express = express();
const port = process.env.PORT || 6969;
const upload = multer({});

app.use(cors());
app.use(express.text());

app.post('/', (req: Request, res: Response) => {
    console.log(`INFO - POST '/'`);
    res.send(parseLines(req.body));
});

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    console.log(`INFO - POST '/upload'`);

    if (req.file !== undefined) {
        let fileContents = req.file.buffer.toString('utf8');
        res.send(parseLines(fileContents));
    } else {
        res.send({
            'message': 'No file uploaded.'
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});