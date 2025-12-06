import { Pipe, PipeTransform } from "@angular/core";
import { FullName } from "../../models/name";

@Pipe({
  name: 'displayName',
  standalone: true
})
export class DisplayNamePipe implements PipeTransform {
  transform(studentOrTeacherWithFullName: FullName): string {
    return `${studentOrTeacherWithFullName.firstname} ${studentOrTeacherWithFullName.lastname}`;
  }
}
