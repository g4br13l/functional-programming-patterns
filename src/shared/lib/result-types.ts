

export namespace Dom {

  export type BrandT<
    T,
    B extends string,
    TAG extends string = ''
  > = T & { _brand: B, _tag: TAG }

  export const immutable = <T>(obj: T): Readonly<T> => Object.freeze(obj) as Readonly<T>

}


export namespace DomError {

  import immutable = Dom.immutable


  export type ErrorT = {
    type: 'ErrorT'
    name: string
    msg: string
    stack?: string
  }

  export type ErrorBT<TAG extends string = any> = Dom.BrandT<ErrorT, 'ErrorT', TAG>

  type MakeErrorParamT =
    Omit<DomError.ErrorT, 'type' | 'name'>
    & Partial<Pick<DomError.ErrorT, 'name'>>


  export const isError = (obj: unknown | ErrorBT): obj is ErrorBT => {
    return(
      typeof obj === 'object'
      && obj !== null
      && '_brand' in obj
      && obj['_brand'] === 'ErrorT'
    )
  }

  export const makeBrandError = <N extends string>(type: N, err: MakeErrorParamT): ErrorBT<N> => {
    return immutable({
      type: 'ErrorT',
      name: err.name ?? type,
      msg: err.msg ?? '',
      stack: err.stack,
      _brand: 'ErrorT',
      _tag: type,
    })
  }

}



export namespace DomResult {

  import ErrorT = DomError.ErrorT
  import ErrorBT = DomError.ErrorBT
  import immutable = Dom.immutable

  export type ErrorFreeT<T> = {
    [K in keyof T]: Exclude<T[K], ErrorT | ErrorT[] | ErrorBT | ErrorBT[]>
  }

  export type OkResT<T> = Readonly<{
    isOk: true,
    value: ErrorFreeT<T>
  }>

  export type ErrResT<E extends ErrorBT[] = ErrorBT[]> = Readonly<{
    isOk: false,
    value: E
  }>

  export const makeOkRes = <T>(okRes: T) => {
    return immutable({ isOk: true, value: okRes }) as OkResT<T>
  }

  export const makeErrRes = <E extends ErrorBT[]>(err: E) => (
    immutable({ isOk: false, value: err }) as ErrResT
  )


}

/* const testError = DomError.makeBrandError('ErrorTypeRight', { msg: 'error message' })
console.log('testError:', testError) */
