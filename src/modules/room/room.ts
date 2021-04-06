import { getModelForClass, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Ref } from 'typegoose';
import { Point } from '../../shared/entities/point';
import { Post } from '../post/post';
import { User } from '../user/user';

@ObjectType()
export class Room {
	@prop()
	@Field()
	start!: Date;

	@prop()
	@Field()
	end!: Date;

	@prop()
	@Field(() => Point)
	coordinate!: Point;

	@prop({ ref: User })
	@Field(() => Types.ObjectId)
	creator!: Ref<User>;

	@prop()
	@Field(() => [Post])
	posts!: Post[];

	@prop({ ref: User })
	@Field(() => [Types.ObjectId])
	users!: Ref<User>[];
}

export const RoomModel = getModelForClass(Room);
