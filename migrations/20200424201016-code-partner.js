'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("partners", "code", {
      type: Sequelize.STRING(10),
      allowNull: false,
    })
    .then( () => {
      return queryInterface.addColumn("partners", "average", {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      })
    })
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.removeColumn("partners", "code")
    .then(()=>  queryInterface.removeColumn("partners", "average"))
  }
};
