import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  manager_id: number;

  @ManyToOne(() => User, (user) => user.managedDepartments, { nullable: true })
  manager: User;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
