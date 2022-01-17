export default (req) => {
  const userId = req.user ? req.user.id : null;
  
  const { companyId } = req.params;
  const { imageDetails } = req.body;
  const updateImageQueryGenerator = (id) =>
    imageDetails
      ? imageDetails.map((imageUrl) => [
          { ...imageUrl, userId },
          {
            where: {
              ...id,
              type: imageUrl.type,
            },
          },
        ])
      : [];
  const updateProfileImageUrlQuery = updateImageQueryGenerator({ userId });
  const updateCompanyImagesQuery = updateImageQueryGenerator({ companyId });

  return {
    updateProfileImageUrlQuery,
    updateCompanyImagesQuery,
  };
};
