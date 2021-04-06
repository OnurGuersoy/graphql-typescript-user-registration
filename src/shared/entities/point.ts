import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Point {
	@prop()
	@Field()
	latitude!: number;
	@prop()
	@Field()
	longitude!: number;
}

export const PointModel = getModelForClass(Point);
