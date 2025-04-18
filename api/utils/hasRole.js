/**
 * Checks if the user's role matches any of the allowed roles.
 * @param {string} userRole - The role of the user (e.g., 'admin')
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean}
 */
export const hasRole = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
};
