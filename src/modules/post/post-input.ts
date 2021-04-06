import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Post } from './post';

@InputType()
export class PostInput implements Partial<Post> {
	@Field()
	@Length(1, 200)
	message!: string;

	@Field()
	image?: string;
}
