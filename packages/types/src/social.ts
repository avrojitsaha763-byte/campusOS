export type PostType = 'announcement' | 'note' | 'lost_found' | 'event' | 'discussion' | 'opportunity';

export interface Post {
  _id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  type: PostType;
  title?: string;
  content: string;
  images?: string[];
  attachments?: Attachment[];
  tags?: string[];
  likes: string[];        // user IDs
  commentCount: number;
  shareCount: number;
  isAnonymous: boolean;
  isPinned: boolean;
  expiresAt?: Date;
  college?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: string[];
  parentCommentId?: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'video' | 'doc' | 'other';
  size: number;
}

export interface Chat {
  _id: string;
  type: 'private' | 'group';
  name?: string;           // for group chats
  avatar?: string;
  participants: string[];  // user IDs
  lastMessage?: Message;
  unreadCount?: number;
  isActive: boolean;
  createdBy?: string;
  createdAt: Date;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  attachments?: Attachment[];
  readBy: string[];       // user IDs
  replyTo?: string;       // message ID
  isEdited: boolean;
  isDeleted: boolean;
  createdAt: Date;
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'order' | 'delivery' | 'payment' | 'social' | 'system' | 'chat';
  title: string;
  body: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}
