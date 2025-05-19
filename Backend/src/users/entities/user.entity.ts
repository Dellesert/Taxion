import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { ChatUser } from 'src/chats/entities/chat-user.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Task } from 'src/tasks/entities/task.entity';

export enum UserType {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.EMPLOYEE,
  })
  user_type: UserType;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  logged_in: boolean;

  @Column({ nullable: true })
  user_token: string;

  @Column({ type: 'timestamp', nullable: true })
  token_expiration: Date;

  @Column({ nullable: true })
  token_vk: string;

  @Column({ nullable: true })
  token_google: string;

   @ManyToOne(() => Department, (department) => department.users, { nullable: true }) // 👈 Связь с департаментом
  department: Department;

  @OneToMany(() => Department, (department) => department.manager)
  managedDepartments: Department[];

  @OneToMany(() => ChatUser, (chatUser) => chatUser.user)
chats: ChatUser[];

@OneToMany(() => Message, (message) => message.user)
messages: Message[];

@OneToMany(() => Task, (task) => task.assignedUser)
tasks: Task[];



}
