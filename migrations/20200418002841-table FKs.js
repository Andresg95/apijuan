'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.addConstraint("transactions", ["user_id"], {
      type: "FOREIGN KEY",
      name: "FK_user_transaction",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "no action",
      onUpdate: "no action"
    })
    .then(async () =>
         await queryInterface.addConstraint("transactions", ["partner_id"], {
          type: "FOREIGN KEY",
          name: "FK_partners_transactions",
          references: {
            table: "partners",
            field: "id"
          },
          onDelete: "no action",
          onUpdate: "no action"
        })
      )
      .then(async () =>
      await queryInterface.addConstraint("codes", ["user_id"], {
       type: "FOREIGN KEY",
       name: "FK_partners_codes",
       references: {
         table: "users",
         field: "id"
       },
       onDelete: "no action",
       onUpdate: "no action"
     })
   )
   .then(async () =>
         await queryInterface.addConstraint("codes", ["partner_id"], {
          type: "FOREIGN KEY",
          name: "FK_user_codes",
          references: {
            table: "partners",
            field: "id"
          },
          onDelete: "no action",
          onUpdate: "no action"
        })
      ) 
     .then(async () =>
      await queryInterface.addConstraint("partners", ["type"], {
       type: "FOREIGN KEY",
       name: "FK_type_partners",
       references: {
         table: "partnerTypes",
         field: "id"
       },
       onDelete: "no action",
       onUpdate: "no action"
     })
   )  
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.removeConstraint("transactions", "FK_user_transaction")
    .then(()=> queryInterface.removeConstraint("transactions", "FK_partners_transactions"))
    .then(()=> queryInterface.removeConstraint("codes", "FK_partners_codes"))
    .then(()=> queryInterface.removeConstraint("codes", "FK_user_codes"))
    .then(()=> queryInterface.removeConstraint("partners", "FK_type_partners"))
  }
};
