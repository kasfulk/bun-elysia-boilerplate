export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
  return Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: saltRounds,
  });
};
