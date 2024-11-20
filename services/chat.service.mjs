import * as db from '../config/db.mjs';


export async function getChatList(user_id) {
    const chatList = await db.Message.find({
        $or: [
            { senderId: user_id },
            { receiverId: user_id }
        ]
    }).select('senderId receiverId').then(messages => {
        const uniqueIds = new Set();

        messages.forEach(message => {
            uniqueIds.add(message.senderId.toString());
            uniqueIds.add(message.receiverId.toString());
        });

        const uniqueIdArray = [...uniqueIds];

        return db.User.find({
            _id: { $in: uniqueIdArray }
        });
    });
    return chatList;
}

export async function sendMessage(from_id, to_netid, value) {
    const to_id = await db.User.findOne({ netid: to_netid });
    const data = { senderId: from_id, receiverId: to_id._id, value: value };
    console.log("SENDING MESSAGE: ", data)
    const newMessage = new db.Message(data);
    return await newMessage.save();
}

export async function getMessages(from_id, to_netid) {
    const to_id = await db.User.findOne({ netid: to_netid });
    const chatList = await db.Message.find({
        $or: [
            { senderId: from_id, receiverId: to_id },
            { receiverId: from_id, senderId: to_id }
        ]
    }).populate('receiverId').populate('senderId').sort({ timeSent: 1 });

    return chatList.map(message => {
        message.timeSent = formatDate(message.timeSent)
        return message
    });
}
const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(date);
};