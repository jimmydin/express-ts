import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import {Server} from 'http';
import createHttpError from 'http-errors';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.send("Application running...")
})

app.use((req: Request, res: Response, next: NextFunction)=>{
 next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
}

app.use(errorHandler);

const server: Server = app.listen(3000, ()=> console.log("App running on port 3000"));

