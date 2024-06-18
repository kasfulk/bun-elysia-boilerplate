interface isAuthenticatedOptions {
  jwtAccess: {
    verify: (token: string) => {
      userId: string;
    };
  };
  cookie: {
    access_token: {
      value: string;
    };
  };
}

export const isAuthenticated = async ({
  jwtAccess,
  cookie,
}: isAuthenticatedOptions) => {
  console.log('/!\\ AUTHENTICATED GUARD /!\\');

  if (!cookie.access_token) {
    console.log('@Error: No access token', cookie);
    return {
      success: false,
      message: 'Unauthorized',
      errors: 'No access token',
    };
  }

  const jwt = await jwtAccess.verify(cookie!.access_token.value);
  if (!jwt) {
    console.log('@Error: Invalid access token', jwt);
    return {
      success: false,
      message: 'Unauthorized',
      errors: 'Invalid access token',
    };
  }

  const { userId } = jwt;
  if (!userId) {
    console.log('@Error: Invalid access token', userId);
    return {
      success: false,
      message: 'Unauthorized',
      errors: 'Invalid access token',
    };
  }

  return {
    success: true,
  };
};
