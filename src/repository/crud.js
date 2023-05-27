class crudRepo {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const res = await this.model.create(data);
      return res;
    } catch (error) {
      console.log({ error });
      throw { error };
    }
  };
  get = async (id) => {
    try {
      const res = await this.model.findById(id);
      return res;
    } catch (error) {
      console.log("error in the crud repo " + error);
      throw error;
    }
  };
  getAll = async () => {
    try {
      const res = await this.model.find({});
      return res;
    } catch (error) {
      console.log("error in the crud repo " + error);
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const res = await this.model.findByIdAndDelete(id);
      return res;
    } catch (error) {
      console.log("error in the crud repo " + error);
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const res = await this.model.findByIdAndUpdate(id, data, { new: true });
      return res;
    } catch (error) {
      console.log("error in the crud repo " + error);
      throw error;
    }
  };
}
module.exports = crudRepo;
