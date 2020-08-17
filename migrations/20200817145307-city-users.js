'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "city", {
      type: Sequelize.STRING(100),
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "city")
  }
};
