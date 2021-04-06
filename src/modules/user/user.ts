import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Ref } from 'typegoose';
import { Room } from '../room/room';
import { LocationType } from './types/location.type';
import { UserType } from './types/user.type';

@ObjectType()
@index({ nickName: 1 }, { unique: true })
export class User {
	@prop()
	password!: string;

	@prop({ unique: true })
	@Field()
	nickName!: string;

	@prop({ unique: true })
	@Field()
	email!: string;

	@prop({ default: UserType.Visitor })
	@Field(() => UserType)
	userType?: UserType;

	@prop({
		maxlength: [300, 'Description cannot be greater than 300'],
		default: '',
	})
	@Field()
	description?: string;

	@prop()
	@Field()
	street?: string;

	@prop()
	@Field()
	houseNumber?: string;

	@prop()
	@Field()
	postalCode?: string;

	@prop()
	@Field()
	telephoneNumber?: string;

	@prop()
	@Field(() => LocationType)
	locationType?: LocationType;

	@prop({ default: 0 })
	totalCrowns?: number;

	@prop({ default: [], ref: User })
	@Field(() => [Types.ObjectId])
	follower?: Ref<User>[];

	@prop({ default: [], ref: User })
	@Field(() => [Types.ObjectId], { defaultValue: [] })
	following?: Ref<User>[];

	@prop()
	@Field(() => [Types.ObjectId])
	room?: Ref<Room>;

	@prop({ default: 0 })
	tokenVersion?: number;
}

export const UserModel = getModelForClass(User);
