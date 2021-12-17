import express, {Request,Response} from 'express'
import mealData from './data/mealData.json'

const cors = require('cors');

const app = express()

app.use(cors());

app.get('/api/meals', (_: Request, res: Response) => {
    res.json(mealData)
})

app.listen(8080, () => {
    console.log('server running on port 8080')
})
