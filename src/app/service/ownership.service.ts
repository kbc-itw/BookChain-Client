import { Injectable } from '@angular/core';
import { IOwnership } from '../model/iownership';

@Injectable()
export class OwnershipService {
	constructor() { }

}

export class OwnershipQuery {

	constructor(
		owner?: String,
		isbn?: Number,
		limit?: Number,
		offset?: Number
	) {

	}

}

interface IOwnershipQuery {
	owner: String;
	isbn: Number;
	limit: Number;
	offset: Number;
}