import db from "../database/models";

const { imageUrl } = db;
export default (req) => {
  const { userId: userID } = req.params;
  const userId = req.user ? req.user.id : null;
  const { firstName, lastName, email, password } = req.body;
  const createUserQuery = { firstName, lastName, email, password };
  const updateUserQuery = [
    { ...createUserQuery },
    {
      where: {
        id: userId,
      },
    },
  ];
  const getUserQuery = {
    where: { id: req.params.userId },
    attributes: { exclude: ["password"] },
    include: [{ model: imageUrl }],
  };
  const getUsersQuery = {
    attributes: { exclude: ["password"] },
    include: [{ model: imageUrl }],
  };
  const checkEmailExistanceQuery = { where: { email } };
  const checkUserIdExistanceQuery = { where: { id: userID } };

  const resePasswordQuery = [
    { password },
    {
      where: {
        id: userId,
      },
    },
  ];
  return {
    createUserQuery,
    getUserQuery,
    getUsersQuery,
    checkEmailExistanceQuery,
    updateUserQuery,
    resePasswordQuery,
    checkUserIdExistanceQuery,
  };
};
