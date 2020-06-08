'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "phone", {
      type: Sequelize.STRING(50),
      allowNull: true
    }).then(()=>{
      return queryInterface.addColumn("users", "address", {
        type: Sequelize.STRING(500),
        allowNull: true
      }).then(()=>{
        return queryInterface.addColumn("users", "address2", {
          type: Sequelize.STRING(500),
          allowNull: true
        })
      })
    } )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "phone")
    .then(()=> queryInterface.removeColumn("users", "address"))
    .then(()=> queryInterface.removeColumn("users", "address2"))

  }
};
