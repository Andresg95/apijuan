'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("codes", "delivery_status", {
      type: Sequelize.CHAR(1),
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("codes", "delivery_status")
  }
};
