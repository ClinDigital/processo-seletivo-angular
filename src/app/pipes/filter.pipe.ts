import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.ownerName.toLowerCase().includes(searchTerm) ||
      item.phone.includes(searchTerm) ||
      item.street.toLowerCase().includes(searchTerm) ||
      item.number.includes(searchTerm) ||
      item.neighborhood.toLowerCase().includes(searchTerm) ||
      item.city.toLowerCase().includes(searchTerm) ||
      item.uf.toLowerCase().includes(searchTerm) ||
      item.cep.includes(searchTerm)
    );
  }
}
