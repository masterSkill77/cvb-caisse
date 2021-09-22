'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('listeappros', {
       id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       idappro:{
        type:Sequelize.INTEGER,
        // reference:{model:'approfous', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:true,
      },
        idpro:{
        type:Sequelize.INTEGER,
        reference:{model:'produits', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:false,
      },
      qt: {
        type: Sequelize.INTEGER
      },
      condition: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('listeappros');
  }
};