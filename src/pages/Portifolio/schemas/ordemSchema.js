import * as Yup from "yup";
export default function vendasSchema() {
  return Yup.object().shape({
    data_compra: Yup.string(),
    aporte: Yup.string(),
    cotacao_na_compra: Yup.string(),
  });
}
