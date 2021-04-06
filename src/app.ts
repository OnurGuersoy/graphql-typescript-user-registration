import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { connect } from 'mongoose';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { CONFIG } from './bootstrap/connect';
import { TypegooseMiddleware } from './bootstrap/typegoose-middleware';
import { PostResolver } from './modules/post/post.resolver';
import { RoomResolver } from './modules/room/room.resolver';
import { UserModel } from './modules/user/user';
import { UserResolver } from './modules/user/user.resolver';
import {
	authChecker,
	createAccessToken,
	createRefreshToken,
} from './shared/auth/auth';
import { Context } from './shared/entities/context';
import { ObjectIdScalar } from './shared/scalars/object-id.scalar';

require('dotenv').config();

const MONGO_DB_URL = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority`;

const bootstrap = async () => {
	try {
		// create mongoose connection
		const mongoose = await connect(MONGO_DB_URL, CONFIG);

		// clean and seed database with some data
		await mongoose.connection.db.dropDatabase();

		// build TypeGraphQL executable schema
		const schema = await buildSchema({
			resolvers: [PostResolver, UserResolver, RoomResolver],
			emitSchemaFile: path.resolve('./src/bootstrap', 'schema.gql'),
			// use document converting middleware
			globalMiddlewares: [TypegooseMiddleware],
			// use ObjectId scalar mapping
			scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
			validate: true,
			container: Container,
			authChecker: authChecker,
		});

		const apolloServer = new ApolloServer({
			schema: schema,
			context: ({ req, res }): Context => ({
				response: res,
				request: req,
			}),
		});

		const app = express();
		app.use(cookieParser());

		app.post('/refresh_token/:token', async (req, res) => {
			const token = req.params.token;
			if (!token) {
				return res.send({
					ok: false,
					accessToken: '',
					refreshToken: '',
				});
			}

			let payload = null as any;
			try {
				payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
			} catch (e) {
				console.log(e);
				return res.send({
					ok: false,
					accessToken: '',
					refreshToken: '',
				});
			}

			const foundUser = await UserModel.findOne({
				nickName: payload.userName,
			});

			if (!foundUser || foundUser.tokenVersion !== payload.tokenVersion) {
				return res.send({
					ok: false,
					accessToken: '',
					refreshToken: '',
				});
			} else {
				return res.send({
					ok: true,
					accessToken: createAccessToken(foundUser),
					refreshToken: createRefreshToken(foundUser),
				});
			}
		});

		apolloServer.applyMiddleware({ app });

		app.listen(9000, () =>
			console.info(`Server running: http://localhost:9000/graphql`),
		);
	} catch (e) {
		console.log(e);
	}
};

bootstrap();
