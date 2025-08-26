export class ShopParams {
    brands: string[] = [];
    types: string[] = [];
    sort = 'name';
    pageSize: number = 10;
    pageIndex: number = 1;
    search = '';
}