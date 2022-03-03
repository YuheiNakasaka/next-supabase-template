import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export const toCamel = <T extends Record<string, any> | readonly any[]>(
  arg: T
) => camelcaseKeys(arg, { deep: true });

export const toSneke = <T extends Record<string, any> | readonly any[]>(
  arg: T
) => snakecaseKeys(arg, { deep: true });
