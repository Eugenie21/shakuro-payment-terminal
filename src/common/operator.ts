import { OperatorType } from './operatorType';

export interface IOperator {
    id: number,
    type: OperatorType,
    name: string,
    countryCode: number
}