import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { ChatUser } from './chat-user.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => ChatUser, (chatUser) => chatUser.chat)
participants: ChatUser[];


}
