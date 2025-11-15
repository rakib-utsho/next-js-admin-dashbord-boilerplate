export interface ChatData {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isActive: boolean
}

export interface Message {
  id: string
  content: string
  sender: "me" | "other"
  timestamp: string
  avatar: string
}
