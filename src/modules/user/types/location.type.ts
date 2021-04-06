import { registerEnumType } from 'type-graphql';

export enum LocationType {
	ShishaBar,
	Club,
	Bar,
	Restaurant,
	Cafe,
}

registerEnumType(LocationType, {
	name: 'LocationType',
});
