export interface IGroupMessage {
  id: string | null,
  messageType: string;
  sender: string;
  receiver: string;
  messageText: string;
  seenDate: string;
}
