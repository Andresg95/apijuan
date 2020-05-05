'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.addColumn("partners", "coordinates", {
        type: Sequelize.TEXT,
        allowNull: false,
      }).then( () => {
        return queryInterface.addColumn("partners", "logo", {
          type: Sequelize.STRING(200),
          allowNull: true
      })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("partners", "coordinates")
    .then(()=> queryInterface.removeColumn("partners", "logo"))
  }
};
