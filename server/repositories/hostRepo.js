const mongoose = require("mongoose");
const { connect } = require("../models/mongoConnection");
const { HostModel } = require("../models/hostModel")
var bcrypt = require('bcryptjs');

module.exports = class HostRepo {
    constructor() {
        connect();
    }

    async getAll() {
        let items = await HostModel.find({}, { password: 0 });
        return items;
    }

    async getByEmailAndPassword(email) {
        let item = await HostModel.find({email:email}, { password: 0 });
        return item;
    }

    async insert(data) {
        let createdHost = await HostModel.create(data);
        let result = await HostModel.findById(createdHost._id, { password: 0 });
        return result;
    }

    async update(id, data) {
        let result = await HostModel.findByIdAndUpdate(id, data, { new: true, select: '-password' });
        return result;
    }

    async delete(id) {
        const existingUser = await this.getById(id);
        if (!existingUser) {
            return { error: 'User not found' };
        }
        else {
            let result = await HostModel.findByIdAndRemove(id);
            return { message: 'User deleted successfully' };
        }

    }

    async validateByEmail(email) {
        let result = await HostModel.findOne({ email: email });
        return result;
    }
}