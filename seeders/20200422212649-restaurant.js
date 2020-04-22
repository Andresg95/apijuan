'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  

      return queryInterface.bulkInsert('partnerTypes', [{
        name: 'Restaurante',
        description: "Comercio que ofrece diversas comidas y bebidas para su consumo en el establecimiento."
      },  
    {
      name: 'default',
      description: "Tipo de comercio por defecto"
    },
      
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('partnerTypes', null, {});
    
  }
};
