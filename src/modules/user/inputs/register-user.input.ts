import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserType } from '../types/user.type';
import { User } from '../user';

@InputType()
export class RegisterUserInput implements Partial<User> {
	@Field()
	@Length(7, 20)
	nickName!: string;

	@Field()
	@IsEmail()
	email!: string;

	@Field()
	@Length(8, 20)
	password!: string;

	@Field()
	role?: UserType;
}
