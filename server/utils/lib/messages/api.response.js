const status = {
    OK: 200,
    ResourceCreated: 201,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    Forbidden: 403,
    NotAcceptable: 406,
    Conflict: 409,
    InternalServerError: 500,
    PreConditionalRequired: 428,
};

const messages = {
    //login
    success_login: 'Logged in successfully',
    error_login_failed: 'Login failed',
    invalid_credentials: 'Invalid credentials',
    unauthorized: 'Unauthorized Access',
    session_expired: 'Session Expired',
    refresh_token_expired: 'Invalid or expired refresh token',
    something_went_wrong: 'Something went wrong, please try again later.',
    status_update: 'Status updated successfully',
    //user
    user_registration: 'User registered successfully',
    user_update: 'User updated successfully',
    user_delete: 'User deleted successfully',
    username_already_exists: 'Username already exists',
    you_account_has_been_disabled: 'Your account has been disabled. Please contact Admin.',
    user_not_found: 'User not found.',
    // role
    role_create: 'Role Created Successfully.',
    role_update: 'Role Updated Successfully.',
    role_delete: 'Role Deleted Successfully.',
    role_not_found: 'Role not Found.',
    role_already_exists: 'Role already exists! Please enter a unique role.',
    //post
    post_create: 'Post Created Successfully.',
    post_update: 'Post Updated Successfully.',
    post_delete: 'Post Deleted Successfully.',
    post_not_found: 'Post not Found.'
};

module.exports = {
    status,
    messages,
};
