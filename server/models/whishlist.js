module.exports = (sequelize, DataTypes) => {
    const Whishlist = sequelize.define("whishlist", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    })
    return Whishlist
} 