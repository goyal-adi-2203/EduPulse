import express from 'express';
import router from express.Router();
import { test } from '../controllers/authControllers';

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', test);
module.exports = router;