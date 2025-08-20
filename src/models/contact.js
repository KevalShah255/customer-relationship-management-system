module.exports = (dbConnection, Sequelize) => {
  const contact = dbConnection.define(
    'contact',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  )
  contact.associate = (models) => {
    contact.belongsTo(models.company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    })
  }
  return contact
}
