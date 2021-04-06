import { Request, Response } from 'express';

export interface Context {
	response: Response;
	request: Request;
	payload?: { userName: string; tokenVersion: number };
}
