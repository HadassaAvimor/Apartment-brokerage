const HostRepo = require("../repositories/hostRepo");
const repo = new HostRepo()

module.exports = class HostService {

    async getAll() {
        return await repo.getAll();
    }

    async getById(id) {
        return repo.getById(id)
    }

    async insert(data) {
        const validBody = valid_model(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await repo.insert(data);
        }
    }

    async update(id, data) {
        let validBody = valid_model(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await repo.update(id,data);
        }
    }

    async delete(id) {
        return await repo.delete(id);
    }

}