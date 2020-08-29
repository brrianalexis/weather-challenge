import { Router } from 'express';
import { getLocation, getCurrent, getForecast } from './controllers';

const router = Router();

router.get('/location', getLocation);
router.get(['/current', '/current/:city'], getCurrent);
router.get(['/forecast', '/forecast/:city'], getForecast);

export { router };
