import { connect } from 'mongoose';

export const CONFIG = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
};

export async function Connect(
	dbname: string,
	host: string,
	pwd?: string,
	user?: string,
) {
	let uri = `mongodb+srv://${host}/${dbname}?retryWrites=true&w=majority`;

	if (user && pwd)
		uri = `mongodb+srv://${user}:${pwd}@${host}/${dbname}?retryWrites=true&w=majority`;

	setTimeout(async () => {
		return await connect(uri, CONFIG);
	}, 6000);
}
