import { Router } from 'express';
const chatRouter = Router();
import * as chatServices from '../services/chat.service.mjs'
import * as userServices from '../services/user.service.mjs'

chatRouter.get('/chat', async (req, res) => {
    const chatList = await chatServices.getChatList(req.session.user._id)
    res.render('chat', { chat_list: chatList, user: req.session.user })
});

chatRouter.get('/chat/:user_net_id', async (req, res) => {
    const from_id = req.session.user._id;
    const to_id = req.params.user_net_id;
    const to_user = await userServices.getByNetid(to_id)
    const allMessages = await chatServices.getMessages(from_id, to_id); // any messages between the two people 
    const allMessagesFlagged = allMessages.map(message => {
        message.mine = message.senderId.netid === req.session.user.netid // to flag current user's messages
        return message
    })

    res.render('single-chat', { to: to_user, messages: allMessagesFlagged, user: req.session.user })
});

chatRouter.post('/chat/:user_net_id', async (req, res) => {
    // sending messages
    const message = req.body.message
    const from_id = req.session.user._id
    const to_id = req.params.user_net_id
    await chatServices.sendMessage(from_id, to_id, message);
    res.redirect(`/chat/${to_id}`)
})

export default chatRouter;