import { Router } from 'express';
import aiRoutes from './ai.routes.js';
import marketRoutes from './market.routes.js';
import tradeRoutes from './trade.routes.js';
import authRoutes from './auth.routes.js';
import botRoutes from './bot.routes.js';
import whopRoutes from './whop.routes.js';

const router = Router();

// API Modules
router.use('/ai', aiRoutes);
router.use('/market', marketRoutes);
router.use('/trade', tradeRoutes);
router.use('/auth', authRoutes);
router.use('/bot', botRoutes);
router.use('/whop', whopRoutes);

export default router;

