import generateQueryArray from "../utils/generateQueryArray";
import modelDefaultError from "../utils/modelDefaultError";
import verifyNullValue from "../utils/verifyNullValue";

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

  getParams = () => {
    return {
      id_user_cripto: this.id_user_cripto,
      cmc_id: this.cmc_id,
      investido: this.investido,
      vendido: this.vendido,
      user_fk: this.user_fk,
    };
  };

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

  getParamsNotNull = () => {
    let obj = this.getParams();
    let params = Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        if (value !== undefined || value !== null) {
          return value;
        }
      })
    );

    return params;
  };

  getPutParams = () => {
    let obj = this.getParams();

    let params = generateQueryArray(obj);

    let { erroMsg, isInvalid } = verifyNullValue(
      this.getCamposObrigatorios("put")
    );

    if (isInvalid) {
      return modelDefaultError(erroMsg);
    }

    return { ...params, ativo: obj };
  };

  getCamposObrigatorios = (type) => {
    if (type == "put") {
      return {
        user_fk: this.user_fk,
      };
    }
  };
}

export default AtivoModel;
