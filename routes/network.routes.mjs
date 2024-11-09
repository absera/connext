import { Router } from 'express';
import * as network from '../services/network.service.mjs'

const networkRouter = Router();

networkRouter.get('/network/user/:user_id', (req, res) => {
    res.render('network', { user: req.session.user })
});

networkRouter.get('/network/data', async (req, res) => {
    const currentUser = req.session.user._id
    const directUsers = await network.getDirectConnectedUsers(currentUser)
    res.send({ directUsers: directUsers })
});

export default networkRouter;
