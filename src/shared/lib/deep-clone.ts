/**
 * Cria uma cópia profunda (deep clone) de um dado, preservando sua tipagem.
 * Suporta: objetos literais, arrays, Date, RegExp, Map e Set.
 *
 * @param data - O dado a ser clonado.
 * @returns Uma cópia profunda do dado com o mesmo tipo.
 */
export function deepClone<T>(data: T): T {

  if (data === null || typeof data !== 'object') return data

  // Trata instâncias de Date.
  if (data instanceof Date) {
    return new Date(data.getTime()) as T
  }

  // Trata instâncias de RegExp.
  if (data instanceof RegExp) {
    return new RegExp(data.source, data.flags) as T
  }

  // Trata arrays.
  if (Array.isArray(data)) {
    return data.map(item => deepClone(item)) as unknown as T;
  }

  // Trata instâncias de Map.
  if (data instanceof Map) {
    const result = new Map()
    data.forEach((value, key) => {
      result.set(deepClone(key), deepClone(value))
    })
    return result as unknown as T
  }

  // Trata instâncias de Set.
  if (data instanceof Set) {
    const result = new Set()
    data.forEach(value => {
      result.add(deepClone(value))
    });
    return result as unknown as T
  }

  // Trata objetos literais ou instâncias de classes (não tratando circularidade).
  const clonedObj = {} as { [key: string]: any }
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = (data as any)[key]
      clonedObj[key] = deepClone(value)
    }
  }

  return clonedObj as T

}
