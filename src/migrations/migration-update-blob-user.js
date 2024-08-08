module.exports = {
    up: (queryInterface, Sequelize) => {
            return Promise.all([
                queryInterface.changeColumn('Users', 'image', {
                    type: Sequelize.BLOB('long'),
                    allowNull: true,
                })
            ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.changeColumn('Users', 'image', 
                {
                    type:Sequelize.STRING,
                    allowNull: true,
                }),
              
            ])
        })
    }
};