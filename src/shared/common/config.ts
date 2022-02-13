import { EnvType } from '../type/index.type';

export default (() => {
  const env: EnvType = process.env;
  return { env };
})();
