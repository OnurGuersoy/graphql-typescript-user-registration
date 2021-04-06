import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginResponseSuccess {
	@Field()
	accessToken!: string;
	@Field()
	refreshToken!: string;
}
