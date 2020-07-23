module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    } 
  };

  return sequelize.define('Reader', schema);
};
