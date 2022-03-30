import generateQueryArray from "../utils/generateQueryArray";
import modelDefaultError from "../utils/modelDefaultError";
import verifyNullValue from "../utils/verifyNullValue";

//id_order: INT
//data_compra: DATE
//aporte: FLOAT
//cotacao_na_compra: FLOAT
//saldo: FLOAT
//fk_user_cripto: INT
//fk_user: INT

// {
//   id_order: null,
//   data_compra: null,
//   aporte: null,
//   cotacao_na_compra: null,
//   saldo: null,
//   fk_user_cripto: null,
//   fk_user: null,
// }

class OrderModel {
  constructor(props, ...rest) {
    const {
      id_order = null,
      data_compra = null,
      aporte = null,
      cotacao_na_compra = null,
      saldo = null,
      fk_user_cripto = null,
      fk_user = null,
    } = props || {};

    this.id_order = id_order || rest?.[0] || null;
    this.data_compra = data_compra || rest?.[0] || null;
    this.aporte = aporte || rest?.[0] || null;
    this.cotacao_na_compra = cotacao_na_compra || rest?.[0] || null;
    this.saldo = saldo || rest?.[0] || null;
    this.fk_user_cripto = fk_user_cripto || rest?.[0] || null;
    this.fk_user = fk_user || rest?.[0] || null;
  }

  getParams = () => {
    return {
      id_order: this.id_order,
      data_compra: this.data_compra,
      aporte: this.aporte,
      cotacao_na_compra: this.cotacao_na_compra,
      saldo: this.saldo,
      fk_user_cripto: this.fk_user_cripto,
      fk_user: this.fk_user,
    };
  };

  setParams = (obj) => {
    if (typeof obj !== "object") {
      return modelDefaultError("setParams: object");
    }

    this.id_order = obj.id_order || this.id_order;
    this.data_compra = obj.data_compra || this.data_compra;
    this.aporte = obj.aporte || this.aporte;
    this.cotacao_na_compra = obj.cotacao_na_compra || this.cotacao_na_compra;
    this.saldo = obj.saldo || this.saldo;
    this.fk_user_cripto = obj.fk_user_cripto || this.fk_user_cripto;
    this.fk_user = obj.fk_user || this.fk_user;
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
        fk_user: this.fk_user,
        fk_user_cripto: this.fk_user_cripto,
      };
    }
  };
}

export default OrderModel;
