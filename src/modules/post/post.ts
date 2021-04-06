import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
	@prop({ maxlength: [200, 'Message cannot be greater than 200'] })
	@Field()
	message!: string;

	@prop({ default: '' })
	@Field()
	image?: string;

	@prop({ default: 0 })
	@Field()
	crowns?: number;

	@prop()
	@Field()
	timestamp!: Date;

	@prop()
	@Field()
	nickName!: string;
}

export const PostModel = getModelForClass(Post);
