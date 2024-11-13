import express from 'express';
import { connectDB } from './config/connectDB.mjs';
import rootRouter from './routes/root.mjs';
import userRouter from './routes/user.mjs';
import bodyParser from 'body-parser';
connectDB();
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', rootRouter);
app.use('/users', urlencodedParser, userRouter);

app.listen(port, () => {
	console.log('Server stated!!!');
});
