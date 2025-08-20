module.exports = (dbConnection, Sequelize) => {
  const company = dbConnection.define(
    'company',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      industry: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
    }
  )
  company.associate = (models) => {
    company.hasMany(models.contact, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    })
  }
  return company
}
