import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Chat } from './chat.entity';

@Entity('chat_users')
export class ChatUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chat_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Chat, (chat) => chat.participants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
