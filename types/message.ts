export type ConversationMessage = {
    id?: number;
    conversationId: number;
    userId: number;
    content: string;
}