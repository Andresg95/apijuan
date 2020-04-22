'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            name: {
                type: Sequelize.STRING(200)
            },
            bio: {
                type: Sequelize.STRING(500),
            },
            dob: {
                type: Sequelize.DATEONLY,
            },
            country: {
                type: Sequelize.STRING(150),
            },
            email: {
                type: Sequelize.STRING(150),
            },
            points: {
                type: Sequelize.INTEGER(11),
            },
            photo: {
                type: Sequelize.TEXT,
            },
            gender: {
                type: Sequelize.CHAR(1, true),
                
            },
            nickname: {
                type: Sequelize.STRING(150),
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        },
        { timestamps: true  })
        .then(() => {

          queryInterface.createTable(
            "transactions",
            {
              id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
              },
              partner_id: {
                type: Sequelize.INTEGER(11),
              },
              user_id: {
                type: Sequelize.INTEGER(11),
              },
              date: {
                type: Sequelize.DATEONLY,
              },
              type: {
                type: Sequelize.CHAR(1, true),
              },
              points: {
                type: Sequelize.INTEGER(11),
              },      
            }, { timestamps: false}   
        )})
        .then(() =>{

          queryInterface.createTable(
            "partnerTypes",
          {
            id: {
              type: Sequelize.INTEGER(11),
              primaryKey: true,
              allowNull: false,
              autoIncrement: true,
            },
            name: {
              type: Sequelize.STRING(225),
            },
            description: {
                type: Sequelize.STRING(225),
            },
          },{timestamps: false})

        })
        .then(()=>{
          queryInterface.createTable(
            "partners",
            {
              id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
              },
              name: {
                type: Sequelize.STRING(200),
              },
              description: {
                  type: Sequelize.STRING(220),
              },
              country: {
                  type: Sequelize.STRING(150),
              },
              city: {
                  type: Sequelize.STRING(150),
              },
              photo: {
                  type: Sequelize.TEXT,
              },
              type: {
                  type: Sequelize.INTEGER(11),
              },
              creation_date: {
                type: Sequelize.DATEONLY,
              },
              phone: {
                  type: Sequelize.STRING(45),
                },
              email: {
                type: Sequelize.STRING(150),
              },
              web: {
                type: Sequelize.STRING(150),
              },
              schedule: {
                  type: Sequelize.TEXT,
              },
            },
            {timestamps: false})
          
        })
        .then( ()=> {

          queryInterface.createTable(
            "codes",
            {
              id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id"
              },
              partner_id: {
                type: Sequelize.INTEGER,
              },
              user_id: {
                  type: Sequelize.INTEGER,
              },
              date: {
                  type: Sequelize.DATEONLY,
              },
              status: {
                  type: Sequelize.CHAR,
              },
            },{timestamps: false}
          )

        })

    },

    down: (queryInterface, Sequelize) => { 
  
      return queryInterface
      .dropTable("users")
      .then(()=> queryInterface.dropTable("transactions"))
      .then(()=> queryInterface.dropTable("partnerTypes"))
      .then(()=> queryInterface.dropTable("partners"))
      .then(()=> queryInterface.dropTable("codes"))
    }
};
