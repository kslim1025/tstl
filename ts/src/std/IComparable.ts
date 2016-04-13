namespace std
{
	export interface IComparable<T>
	{
		equals(obj: T): boolean;

		less(obj: T): boolean;

		hash(): number;
	}

	/**
	 * <p> For equality comparison. </p>
	 *
	 * <p> Binary fucntion returns whether the arguments are equal. </p> 
	 *
	 * @param <T> Type of arguments to compare.
	 *
	 * @param first First element to compare.
	 * @param second Second element to compare.
	 *
	 * @return Whether the arguments are equal.
	 */
	export function equals<T>(left: T, right: T): boolean
	{
		if (left instanceof Object && (<any>left).equals != undefined)
			return (<any>left).equals(right);
		else
			return left == right;
	}

	/**
	 * <p> Function for less-than inequality comparison. </p>
	 *
	 * <p> Binary function returns whether the its first argument compares less than the second. </p>
	 *
	 * <p> Generically, function objects are instances of a class with member function {@link IComparable.less less} 
	 * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly. 
	 * This member function allows the object to be used with the same syntax as a function call. </p>
	 * 
	 * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()}</code>, 
	 * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
	 *
	 * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation 
	 *			  <i>operator<()</i> or method {@link IComparable.less less}.
	 *
	 * @param first First element, the standard of comparison.
	 * @param second Second element compare with the first.
	 *
	 * @return Whether the first parameter is less than the second.
	 */
	export function less<T>(left: T, right: T): boolean
	{
		if (left instanceof Object)
			if ((<any>left).less != undefined) // has less()
				return (<any>left).less(right);
			else
				return (<any>left).__getUID() < (<any>right).__getUID();
		else
			return left < right;
	}

	/**
	 * <p> Function for greater-than inequality comparison. </p>
	 *
	 * <p> Binary function returns whether the its first argument compares greater than the second. </p>
	 *
	 * <p> Generically, function objects are instances of a class with member function {@link less} and
	 * {@link equals equals()} defined. If an object doesn't have those methods, then its own uid will be used
	 * to compare insteadly. This member function allows the object to be used with the same syntax as a function 
	 * call. </p>
	 * 
	 * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()}, 
	 * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
	 *
	 * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation 
	 *			  <i>operator>()</i> or method {@link IComparable.greater greater}.
	 *
	 * @param left
	 * @param right
	 */
	export function greater<T>(left: T, right: T): boolean
	{
		return !std.less(left, right) && !std.equals(left, right);
	}

	export function hash(obj: any): number
	{
		return base.hash.code(obj);
	}

	/**
	 * Incremental sequence of unique id for objects.
	 */
	var __s_iUID: number = 0;

	Object.defineProperties(Object.prototype,
	{
		"__getUID":
		{
			value: function (): number
			{
				if (this.hasOwnProperty("__m_iUID") == false)
				{
					var uid: number = ++__s_iUID;

					Object.defineProperty
						(
						this, "__m_iUID",
						{
							"get": function (): number
							{
								return uid;
							}
						}
					);
				}

				return this.__m_iUID;
			}
		}
	});
}