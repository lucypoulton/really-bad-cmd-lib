/**
 * An entity capable of holding a permission.
 */
export interface Permissible {

	/**
	 * Determines whether this entity holds the given permission.
	 * @param permission a permission string. The format of this string is not defined and is left to the implementation.
	 */
	hasPermission(permission: string): boolean
}
