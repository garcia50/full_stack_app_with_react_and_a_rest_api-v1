// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     emailAddress: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {});
//   User.associate = (models) => {
//     User.hasMany(models.Course, { 
//       foreignKey: {
//         fieldName: 'userId',
//         allowNull: false
//       }
//     });
//   };
//   return User;
// };


'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          args: true,
          msg: "Email address required"
        },
        isEmail: {
          args: true, 
          msg: "Please enter a valid email address."
        },
        unique: { 
          args: true, 
          message: "Email address is already in use!" 
        }
      }
    },
    password: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Course, { 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  };
  return User;
};