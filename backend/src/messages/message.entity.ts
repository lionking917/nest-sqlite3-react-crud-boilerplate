import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  detail: string;

  @Column()
  timestamp: number;

  @Column({ default: false })
  read: boolean;
}
