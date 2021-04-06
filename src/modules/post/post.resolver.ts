import { Query, Resolver } from 'type-graphql';
import { Post, PostModel } from './post';

@Resolver(() => Post)
export class PostResolver {
	@Query(() => [Post])
	async posts(): Promise<Post[]> {
		return PostModel.find({});
	}
}
