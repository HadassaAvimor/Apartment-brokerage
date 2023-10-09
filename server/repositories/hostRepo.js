const mongoose = require("mongoose");
const { connect } = require("../models/mongoConnect");
const {HostModel} = require("../models/hostModel")

module.exports = class HostRepo {
        async getAll() {
        let items = await HostModel.find({});
        return items;
    }

    async getById(id) {
        let item = await HostModel.findById(id);
        return item;
    }

    async insert(data) {
        let result = await HostModel.create(data);
        return result;
    }

    async update(id, data) {
        let result = await HostModel.findByIdAndUpdate(id, data, { new: true });
        return result;
    }

    async delete(id) {
        let result = await HostModel.findByIdAndDelete(id);
        return result;
    }
}