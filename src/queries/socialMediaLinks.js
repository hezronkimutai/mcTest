import {socialMediaAccounts} from "../constants/index";
export default (req) => {
  const { companyId } = req.params;
  const { google, facebook, twitter } = req.body;
  const socialMediaInputs = {google, facebook, twitter};  
  const updateCompanySocialMediaLinksQuery = socialMediaAccounts.map(
    (account) => [
      { link: socialMediaInputs[account] },
      {
        where: {
          companyId,
          type: account,
        },
      },
    ]
  );

  return {
    updateCompanySocialMediaLinksQuery,
  };
};
