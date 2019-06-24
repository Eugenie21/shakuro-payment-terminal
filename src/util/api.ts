import { OperatorType, IOperator } from 'Common';

export interface IApiResponse<T> {
    success: boolean,
    data?: T,
    error?: string
}

export interface IRefillInputData {
    operatorId: number,
    phoneNumber: string,
    amount: string
}

const operatorsList: IOperator[] = [
    {
        id: 0,
        type: OperatorType.MTS,
        name: 'MTS',
        countryCode: 7
    }, {
        id: 1,
        type: OperatorType.BEELINE,
        name: 'Beeline',
        countryCode: 3
    }, {
        id: 2,
        type: OperatorType.MEGAFON,
        name: 'Megafon',
        countryCode: 7
    }
];

export function getOperators(): Promise<IApiResponse<IOperator[]>> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                data: operatorsList
            });
        }, 1000);
    });
}

export function getOperator(id: number): Promise<IApiResponse<IOperator>> {
    return new Promise(resolve => {
        const operator = operatorsList.find(operator => operator.id === id);
        setTimeout(() => {
            resolve({
                success: Boolean(operator),
                data: operator
            });
        }, 1000);
    });
}

export function refill(input: IRefillInputData): Promise<IApiResponse<undefined>> {
    console.log(input);
    return new Promise(resolve => {
        setTimeout(() => {
            Math.random() >= .5
                ? resolve({ success: true })
                : resolve({ success: false, error: 'Error while trying to refill.' })
        }, 2000);
    });
}