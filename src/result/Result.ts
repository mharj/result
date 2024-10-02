import {fromJsonResult, isJsonResult} from './JsonResult.js';
import {type IErr, type IJsonErr, type IJsonOk, type IOk, type IResult} from '../interfaces/index.js';
import {isResult} from './ResultInstance.js';

/**
 * wrap Result from JsonResult, IOk or IErr
 * @param value - any IResult or JsonResult to wrap as IResult
 * @returns
 */
export function Result<_OkType = unknown, ErrType = unknown>(value: IErr<ErrType> | IJsonErr<ErrType>): IErr<ErrType>;
export function Result<OkType = unknown, _ErrType = unknown>(value: IOk<OkType> | IJsonOk<OkType>): IOk<OkType>;
export function Result<OkType = unknown, ErrType = unknown>(
	value: IOk<OkType> | IErr<ErrType> | IJsonOk<OkType> | IJsonErr<ErrType>,
): IResult<OkType, ErrType> {
	if (isResult(value)) {
		return value;
	}
	if (isJsonResult(value)) {
		return fromJsonResult<OkType, ErrType>(value);
	}
	throw new TypeError('Invalid Result type');
}
