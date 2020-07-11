'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("partners", "token", {
      type: Sequelize.STRING(200),
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("partners", "token")
  }
};


