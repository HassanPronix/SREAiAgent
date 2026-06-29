export type Role = "user" | "assistant";

export interface ChatMessageType {
    id: string;
    role: Role;
    content: string;
    createdAt?: Date;
}