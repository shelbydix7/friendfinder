import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import path from 'path';
import exphbs from 'express-handlebars';
import flash from 'connect-flash';
import expressMessages from 'express-messages';
import session from 'express-session';

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.set('view engine', 'handlebars');

const viewsPath = path.join(__dirname, 'app', 'views');
app.set('views', viewsPath);
app.engine(
  'handlebars',
  exphbs({ defaultLayout: 'main', layoutsDir: viewsPath + '/layouts' })
);
app.use(express.static(__dirname + '/app/public'));

import htmlRoutes from './app/routes/htmlRoutes';
import apiRoutes from './app/routes/apiRoutes';

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Friend Finder is listening on PORT ${PORT}`);
});