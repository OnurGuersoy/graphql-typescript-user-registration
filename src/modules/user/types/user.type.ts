import { registerEnumType } from 'type-graphql';

export enum UserType {
	Location,
	Visitor,
}

registerEnumType(UserType, {
	name: 'UserType',
});
