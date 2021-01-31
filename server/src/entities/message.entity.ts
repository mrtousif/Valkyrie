import { Column, Entity, ManyToOne } from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';
import { AbstractEntity } from './abstract.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { MessageResponse } from '../models/response/MessageResponse';

@Entity('messages')
export class Message extends AbstractEntity {
  @Column('text', { nullable: true })
  text!: string;

  @Column('text', { nullable: true })
  url!: string;

  @Column('varchar', { length: 50, nullable: true })
  filetype!: string;

  @ManyToOne(() => Channel)
  @Exclude()
  channel!: Channel;

  @ManyToOne(() => User, (user) => user.id)
  @Exclude()
  user!: User;

  toJSON(): MessageResponse {
    const response =  <MessageResponse>classToPlain(this);
    response.user = this.user.toMember();
    return response;
  }
}