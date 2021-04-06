import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { User } from '../../modules/user/user';
import { Context } from '../entities/context';

export const createAccessToken = (user: User) => {
	return sign({ userName: user.nickName }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '30m',
	});
};

export const createRefreshToken = (user: User) => {
	return sign(
		{ userName: user.nickName },
		process.env.REFRESH_TOKEN_SECRET!,
		{
			expiresIn: '14d',
		},
	);
};

export const checkPassword = async (password: string, user: User) => {
	const isValid = await compare(password, user.password);
	if (!isValid) {
		throw new Error('Login not successful');
	}
};

export const authChecker: AuthChecker<Context> = ({ context }) => {
	const authorization = context.request.headers['authorization'];

	if (!authorization) {
		return false;
	}

	try {
		const token = authorization?.split(' ')[1];
		context.payload = verify(
			token,
			process.env.ACCESS_TOKEN_SECRET!,
		) as any;
		return true;
	} catch (e) {
		return false;
	}
};
