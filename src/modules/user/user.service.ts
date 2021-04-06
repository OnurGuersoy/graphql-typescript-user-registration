import { DocumentType } from '@typegoose/typegoose';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import {
	checkPassword,
	createAccessToken,
	createRefreshToken,
} from '../../shared/auth/auth';
import { RegisterUserInput } from './inputs/register-user.input';
import { LoginResponseSuccess } from './response/login-response.success';
import { User, UserModel } from './user';

@Service()
export class UserService {
	async findByNickName(nickName: string): Promise<User> {
		const foundVisitor = await UserModel.findOne({
			nickName: nickName,
		});
		if (!foundVisitor) {
			throw new Error('User could not be found');
		} else {
			return foundVisitor;
		}
	}

	async login(
		nickName: string,
		password: string,
	): Promise<LoginResponseSuccess> {
		const foundUser = await this.findByNickName(nickName);
		await checkPassword(password, foundUser);
		const accessToken = createAccessToken(foundUser);
		const refreshToken = createRefreshToken(foundUser);
		return { accessToken: accessToken, refreshToken: refreshToken };
	}

	async registerUser(userInput: RegisterUserInput): Promise<boolean> {
		userInput.password = await hash(userInput.password, 12);
		const user = new UserModel({
			...userInput,
		});

		return await this.saveUser(user);
	}

	private async saveUser(user: DocumentType<User>): Promise<boolean> {
		try {
			await user.save();
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
