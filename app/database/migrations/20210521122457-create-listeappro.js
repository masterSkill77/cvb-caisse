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
<<<<<<< HEAD
        // reference:{model:'approfous', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:true,
=======
        reference:{model:'approfous', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:false,
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f
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