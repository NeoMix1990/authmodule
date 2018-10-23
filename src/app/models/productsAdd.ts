export class ProductsAdd {
    idCMS: number;
    idCRM: number;
    idERP: string;
    idERPDescription: string;
    packagings: [
        {
        quantity: number;
        unit: string
        }
    ];
    productProperties: string;
}