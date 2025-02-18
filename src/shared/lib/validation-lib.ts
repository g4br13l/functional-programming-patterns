import { Dom, DomError, DomResult } from './result-types'
import BrandT = Dom.BrandT
import ErrorBT = DomError.ErrorBT
import OkResT = DomResult.OkResT
import ErrResT = DomResult.ErrResT
import imt = Dom.immutable
import makeBrandError = DomError.makeBrandError
import isError = DomError.isError
import makeErrRes = DomResult.makeErrRes
import makeOkRes = DomResult.makeOkRes




/* TODO: Build a small lib for run-time validating
* Primitives:
*   - v.string()
*   - v.number()
*   - v.boolean()
*   - v.date()
*/
/* String validations:
*   - v.string().maxLen(5)
*   - v.string().minLen(5)
*   - v.string().email()
*   - v.string().url()
*   - v.string().regex()
*   - v.string().includes()
*   - v.string().startsWith()
*   - v.string().endsWith()
*   - v.string().datetime()
*   - v.string().date()
* String transforms
*   - v.string().trim()
*   - v.string().toLowerCase()
*   - v.string().toUpperCase()
* */
/* Number validations:
*   - v.number().max(5)
*   - v.number().min(5)
*   - v.number().int()
*   - v.number().positive()
*   - v.number().negative()
*   - v.number().zeroOrPositive()
*   - v.number().zeroOrNegative()
*   - v.number().multipleOf(5)
*   - v.number().safe() // between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
*  */
/* Boolean Validation:
*   const isActive = z.boolean({
*     required_error: "isActive is required",
*     invalid_type_error: "isActive must be a boolean",
*   }) */
/* Dates validations:
*   - v.date().min(new Date("1900-01-01"), { message: "Too old" })
*   - v.date().max(new Date(), { message: "Too young!" })
*   - v.date().safeParse(new Date()); // success: true
*   - v.date().safeParse("2022-01-12T00:00:00.000Z"); // success: false
* */


export const validationLib = () => {

  type NameBT = BrandT<string, 'NameT'>
  type EmailBT = BrandT<string, 'EmailT'>

  // validation type errors
  type NameInvalidErrorBT = ErrorBT<'NameInvalidErrorT'>
  type EmailInvalidErrorBT = ErrorBT<'EmailInvalidErrorT'>

  type ValidationsT = Omit<VConfigT, 'chain' | 'obj' | 'validate'>
  type VReturnsT = ReturnType<VConfigT[keyof ValidationsT]>
  type SchemaParamT = { [K: string]: VReturnsT }

  type VConfigT = {
    nameT: (value: string) => NameBT | NameInvalidErrorBT
    emailT: (value: string) => EmailBT | EmailInvalidErrorBT
    chain: {
      minLength: (value: string, minLen: number) => boolean
      maxLength: (value: string, maxLen: number) => boolean
    }
    obj: {
      schema: <T extends SchemaParamT>(schema: T) => OkResT<T> | ErrResT
      isValid: <T>(result: OkResT<T> | ErrResT) => result is OkResT<T>
    }
  }


  const V: VConfigT = {

    nameT: (value: string): NameBT | NameInvalidErrorBT => {
      const nameRegEx =
        /^(?! )[A-Za-zÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïñòóôõöùúûü ]{3,100}(?<! )$/
      if (nameRegEx.test(value as string)) {
        return imt(value as NameBT)
      }
      return imt(
        makeBrandError('NameInvalidErrorT', { msg: `"${ value }" is not a valid name.` })
      )
    },

    emailT: (value: string): EmailBT | EmailInvalidErrorBT => {
      if (value.includes('@')) {
        return imt(value as EmailBT)
      }
      return imt(
        makeBrandError('EmailInvalidErrorT', { msg: `"${ value }" is not a valid email` })
      )
    },

    /* StringT: (value: unknown): string | IsNotStringErrorBT => {
      if (typeof value === 'string') return imt(value as string)
      return imt(makeBrandError('IsNotStringErrorT', { msg: `"${value}" is not a string` }))
    }, */

    chain: {
      minLength: (value: string, minLen: number) => value.length >= minLen,
      maxLength: (value: string, maxLen: number) => value.length <= maxLen,
    },

    /* validate: (validate: ValidationsT, options?: VOptionsT) => {

    }, */

    obj: {

      schema<T extends SchemaParamT>(schema: T): OkResT<T> | ErrResT {
        const errors: ErrorBT[] = []
        const okValues = {} as T
        for(const key in schema) {
          const value = schema[key]
          if (isError(value)) errors.push(value)
          else okValues[key] = value
        }
        if (errors.length > 0) return makeErrRes(errors)
        return makeOkRes(okValues)
      },

      isValid<T>(result: OkResT<T> | ErrResT): result is OkResT<T> {
        return result.isOk;
      }

    },
  }


  // Possible improvements using:
  /* const validateObj = validateObj({
    userName: t.nameT('Gabriel').minLen(3).maxLen(10).withError('Name is not valid'),
    userEmail: t.emailT('gabriel@email.com').minLen(3).maxLen(100)
    // OR
    name: v.validate(V.nameT('Gabriel'), [V.opt.minLength(3), V.opt.maxLength(10)])
    name: v.validate(V.nameT('Gabriel'), [minLength(3), maxLength(10)])
    name: v.validate(V.nameT('Gabriel'), { minLength: 3, maxLength: 10 })
    name: v.validate(V.nameT, { minLength: 3, maxLength: 10 })('Gabriel')
    name: v.validate(V.nameT, minLength(3), maxLength(10))('Gabriel')
  }) */

  const userValidation = V.obj.schema({
    name: V.nameT('Gab'),
    email: V.emailT('gab@email.com')
  })

  if (!V.obj.isValid(userValidation)) return userValidation.value
  const validUser = { ...userValidation.value }

  const printUserData = (name: NameBT, email: EmailBT) => ({ 'name:': name, 'email': email })

  return printUserData(validUser.name, validUser.email)

}

console.log('call validationLib():', validationLib())
