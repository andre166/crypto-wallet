import generateQueryArray from "../utils/generateQueryArray.js";
import modelDefaultError from "../utils/modelDefaultError.js";

// id_user_cripto: INTEGER
// cmc_id: INTEGER
// investido: FLOAT
// vendido: FLOAT
// user_fk: INTEGER

class AtivoModel {
  constructor(props, ...rest) {
    const {
      id_user_cripto = null,
      cmc_id = null,
      investido = null,
      vendido = null,
      user_fk = null,
    } = props || {};

    this.id_user_cripto = id_user_cripto || rest?.[0] || null;
    this.cmc_id = cmc_id || rest?.[1] || null;
    this.investido = investido || rest?.[2] || null;
    this.vendido = vendido || rest?.[3] || null;
    this.user_fk = user_fk || rest?.[4] || null;
  }

  setParams = (obj) => {
    if (typeof obj !== "object") {
      return modelDefaultError("setParams: object");
    }

    this.id_user_cripto = obj.id_user_cripto || this.id_user_cripto;
    this.cmc_id = obj.cmc_id || this.cmc_id;
    this.investido = obj.investido || this.investido;
    this.vendido = obj.vendido || this.vendido;
    this.user_fk = obj.user_fk || this.user_fk;
  };

  getParams = () => {
    return {
      id_user_cripto: this.id_user_cripto,
      cmc_id: this.cmc_id,
      investido: this.investido,
      vendido: this.vendido,
      user_fk: this.user_fk,
    };
  };

  getParamsNotNull = () => {
    let obj = this.getParams();
    let params = Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => {
        if (v !== undefined || v !== null) {
          return v;
        }
      })
    );

    return params;
  };

  getPutParams = () => {
    let obj = this.getParams();

    let params = generateQueryArray(obj);

    if (obj.user_fk == null) {
      return modelDefaultError("falta user_fk");
    }

    // retorno { arr, quantParams, ID, sql, ativo  }
    return { ...params, ativo: obj };
  };
}

export default AtivoModel;
