export interface IGroupMessage{
    
        id: string,
        senderId: string,
        message: string,
        messageReceivers: [
          {
            id: string,
            receiverId: string,
            message: string,
            seen: boolean
          }
        ]
      
}