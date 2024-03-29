'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payementfous', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idprovision:{
        type:Sequelize.INTEGER,
<<<<<<< HEAD
        // reference:{model:'listeappros', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:true,
=======
        reference:{model:'listeappros', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:false,
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f
      },
      payee: {
        type: Sequelize.INTEGER
      },
      datepayement: {
        type: Sequelize.DATE
      },
      dateEcheance: {
        type: Sequelize.DATE
      },
      net: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payementfous');
  }
};