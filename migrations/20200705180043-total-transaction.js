'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("transactions", "total", {
      type: Sequelize.FLOAT(11),
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("transactions", "total")
  }
};
