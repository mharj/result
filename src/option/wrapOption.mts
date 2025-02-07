import {None} from './None.mjs';
import {type IOption} from './OptionInstance.mjs';
import {Some} from './Some.mjs';

/**
 * Wrap function to Option function (try-catch)
 * @example
 * const bufferFrom = wrapFnOption(Buffer.from);
 * const bufferOptionData: IOption<Buffer> = bufferFrom('test', 'utf-8');
 * @since v1.0.5
 */
export function wrapFnOption<TArgs extends any[], SomeType>(func: (...args: TArgs) => SomeType) {
	return (...args: TArgs): IOption<SomeType> => {
		try {
			return Some(func(...args));
		} catch (_err) {
			return None();
		}
	};
}

/**
 * Wrap Promise function to Promised Option function (try-catch)
 * @example
 * const readFile = wrapPromiseFnOption(fs.promises.readFile);
 * const fileOption: IOption<string | Buffer> = await readFile('./some.file');
 * @since v1.0.5
 */
export function wrapPromiseFnOption<TArgs extends any[], SomeType>(func: (...args: TArgs) => Promise<SomeType>) {
	return async (...args: TArgs): Promise<IOption<SomeType>> => {
		try {
			return Some(await func(...args));
		} catch (_err) {
			return None();
		}
	};
}
