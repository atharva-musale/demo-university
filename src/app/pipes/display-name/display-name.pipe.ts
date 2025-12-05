import { Pipe } from "@angular/core";

@Pipe({
  name: 'displayName',
  standalone: true
})
export class DisplayNamePipe {
  transform(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }
}
