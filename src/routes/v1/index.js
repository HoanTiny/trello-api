import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoutes } from './boardRoutes';
const router = express.Router();

router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' });
});

router.use('/boards', boardRoutes);

export const APIs_v1 = router;
