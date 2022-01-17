import associationsGenerator from "../../helpers/associationsGenerator";

export default (sequelize, DataTypes) => {
  const company = sequelize.define(
    "company",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require("sequelize").UUIDV4,
      },
      companyName: DataTypes.STRING,
      brandColor: {type:DataTypes.STRING,defaultValue:'#047bd3'},
      supportEmail: DataTypes.STRING,
      subDomain: DataTypes.STRING,
      customDomain: DataTypes.STRING,
      websiteUrl: DataTypes.STRING,
      styles: DataTypes.STRING,
    },
    {}
  );  
  company.associate = (models) => {
    company.hasMany(
      models.widget,
      ...associationsGenerator("id", "companyId")
    );    
    company.hasMany(
      models.imageUrl,
      ...associationsGenerator("id", "companyId")
    );
    company.hasMany(
      models.search,
      ...associationsGenerator("id", "companyId")
    );
    company.hasMany(
      models.message,
      ...associationsGenerator("id", "companyId")
    );
    company.hasMany(
      models.article,
      ...associationsGenerator("id", "companyId")
    );
    company.hasMany(
      models.category,
      ...associationsGenerator("id", "categoryId")
    );
    company.hasMany(
      models.socialMediaLink,
      ...associationsGenerator("id", "companyId")
    );
    company.hasMany(
      models.articleRead,
      ...associationsGenerator("id", "companyId")
    );
  };
  return company;
};
