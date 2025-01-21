
run: 
	@nodemon

migrate:
	@npx sequelize-cli --config config/sequelize.config.js db:migrate