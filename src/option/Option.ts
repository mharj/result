import {
	type IAnd,
	type IAndThen,
	type IClone,
	type IEquals,
	type IExpect,
	type IOptionMatch,
	type IOr,
	type IOrElse,
	type IToResult,
	type IUnWrap,
} from '../interfaces/index.js';

export interface OptionImplementation<SomeType>
	extends IUnWrap<SomeType, Error>,
		IEquals<IOption>,
		IClone<IOption<SomeType>>,
		IOr<IOption, IOption<SomeType>>,
		IOrElse<IOption, IOption<SomeType>>,
		IAnd<IOption, IOption<SomeType>>,
		IAndThen<SomeType, IOption, INone<SomeType>>,
		IExpect<SomeType>,
		IOptionMatch<SomeType>,
		IToResult<SomeType> {
	/**
	 * Returns true if the option is a Some value.
	 * @example
	 * Some(2).isSome // true
	 * None<number>().isSome // false
	 */
	isSome: boolean;
	/**
	 * Returns true if the option is a None value.
	 * @example
	 * Some(2).isNone // false
	 * None<number>().isNone // true
	 */
	isNone: boolean;

	/**
	 * Returns the contained Some value, consuming the self value.
	 *
	 * Warning: currently TS can't change type of "this" (with asserts) and return value at the same time.
	 * https://github.com/microsoft/TypeScript/issues/41339
	 * @returns {IOption<SomeType>} copy of original Option
	 * @example
	 * const x = Some(2);
	 * const y = x.take();
	 * console.log(x.isNone); // true
	 * console.log(y.isSome); // true
	 */
	take(): IOption<SomeType>;

	/**
	 * Replace the actual value with the given one and returns the old Option.
	 *
	 * Warning: currently TS can't change type of "this" (with asserts) and return value at the same time.
	 * https://github.com/microsoft/TypeScript/issues/41339
	 * @param value new value
	 * @returns {IOption<SomeType>} old Option
	 * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.replace
	 */
	replace(value: SomeType): IOption<SomeType>;

	/**
	 * Inserts value into Option.
	 * @param value new value
	 * @returns {SomeType} currently set value
	 * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.insert
	 */
	insert(value: SomeType): SomeType;

	/**
	 * Inserts value into Option if the option is None, then current set value is returned.
	 * @param value new value
	 * @returns {SomeType} currently set value
	 * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.get_or_insert
	 */
	getOrInsert(value: SomeType): SomeType;

	/**
	 * Convert Option to string
	 */
	toString(): `Some(${string})` | `None()`;
}

export interface ISome<SomeType> extends Omit<OptionImplementation<SomeType>, 'isNone' | 'isSome'> {
	/**
	 * Returns true if the option is a None value.
	 * @example
	 * Some(2).isNone // false
	 */
	isNone: false;
	/**
	 * Returns true if the option is a Some value.
	 * @example
	 * Some(2).isSome // true
	 */
	isSome: true;
}

export interface INone<SomeType> extends Omit<OptionImplementation<SomeType>, 'isNone' | 'isSome'> {
	/**
	 * Returns true if the option is a None value.
	 * @example
	 * None<number>().isNone // true
	 */
	isNone: true;
	/**
	 * Returns true if the option is a Some value.
	 * @example
	 * None<number>().isSome // false
	 */
	isSome: false;
}

/**
 * IOption represents an optional value: every Option is either Some and contains a value and type, or None which does not any type.
 * @template SomeType type of the value
 * @example
 * function divide(numerator: number, denominator: number): Option<number> {
 *   if (denominator === 0) {
 *     return None<number>();
 *   }
 *   return Some(numerator / denominator);
 * }
 * const result = divide(2, 3);
 * if (result.isSome) {
 *   console.log('Result: ' + result.unwrap());
 * } else {
 *   console.log('Cannot divide by 0');
 * }
 */
export type IOption<SomeType = unknown> = ISome<SomeType> | INone<SomeType>;
