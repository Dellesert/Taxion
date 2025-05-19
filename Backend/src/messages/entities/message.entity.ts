import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Chat } from '../../chats/entities/chat.entity';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  chat_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'text' })
  message_text: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
