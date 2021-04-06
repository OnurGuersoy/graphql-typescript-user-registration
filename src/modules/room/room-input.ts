import { Field, InputType } from 'type-graphql';
import { Room } from './room';

@InputType()
export class RoomInput implements Partial<Room> {
	@Field()
	start!: Date;

	@Field()
	end!: Date;
}
