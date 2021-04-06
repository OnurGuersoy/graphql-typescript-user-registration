import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../../shared/entities/context';
import { RegisterUserInput } from './inputs/register-user.input';
import { LoginResponseSuccess } from './response/login-response.success';
import { User } from './user';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly service: UserService) {}

	@Mutation(() => Boolean)
	async register(
		@Arg('user') userInput: RegisterUserInput,
	): Promise<boolean> {
		return await this.service.registerUser(userInput);
	}

	@Mutation(() => LoginResponseSuccess)
	async login(
		@Arg('username') username: string,
		@Arg('password') password: string,
	): Promise<LoginResponseSuccess> {
		return await this.service.login(username, password);
	}

	@Query(() => User)
	@Authorized()
	async me(@Ctx() { payload }: Context): Promise<User> {
		return await this.service.findByNickName(payload!.userName);
	}
}
