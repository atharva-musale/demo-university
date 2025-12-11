import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DatePlaceholderMaskDirective } from "./date-placeholder-mask.directive";
import { getIndexOfLastCharacter, formatInputWithDatePattern, formatForDisplay } from "./date-placeholder-mask.helpers";


describe('Date PlaceholderMask directive', () => {
  @Component({
    template: `
      <input [datePlaceholderMask]="pattern" id="inputDate" />
    `,
    standalone: true,
    imports: [DatePlaceholderMaskDirective]
  })
  class FakeComponent {
    public pattern = 'dd/mm/yyyy';
  }

  let fixture: ComponentFixture<FakeComponent>;
  let inputDebugEl: DebugElement;
  let inputEl: HTMLInputElement;
  let component: FakeComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FakeComponent]
    }).createComponent(FakeComponent);
    inputDebugEl = fixture.debugElement.query(By.css('#inputDate'));
    component = fixture.componentInstance;
    inputEl = inputDebugEl.nativeElement;
  });

  it('should have an input el for testing', () => {
    expect(inputEl).toBeDefined();
  });

  it('default placeholder should be dd/mm/yyyy', () => {
    const event = new KeyboardEvent('input', {});
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.value).toBe('');
  });

  it('backslash should not be typed', () => {
    const event = new KeyboardEvent('input', {});
    inputEl.value = '02/mm/yyyy';
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.selectionStart).toEqual(3);
    expect(inputEl.selectionEnd).toEqual(3);
  });

  it('directive pattern is User Configurable', () => {
    component.pattern = 'mm/dd/yyyy';
    fixture.detectChanges();
    const event = new KeyboardEvent('input', {});
    inputEl.value = '02/1d/yyyy';
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.selectionStart).toEqual(4);
    expect(inputEl.selectionEnd).toEqual(4);
  });

  it('directive pattern can take non english input', () => {
    component.pattern = 'ηη/μμ/εεεε';
    fixture.detectChanges();
    const event = new KeyboardEvent('input', {});
    inputEl.value = '12/μμ/εεεε';
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.selectionStart).toEqual(3);
    expect(inputEl.selectionEnd).toEqual(3);
  });

  it('should not display pattern in the input', () => {
    component.pattern = 'dd/mm/yyyy';
    fixture.detectChanges();
    const event = new InputEvent('input', {
      data: '2'
    });
    inputEl.value = '12';
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    expect(inputEl.value).toEqual('12/');
  });

  it('should automatically add 0 if user presses forward slash', () => {
    component.pattern = 'dd/mm/yyyy';
    fixture.detectChanges();
    const event1 = new KeyboardEvent('keydown', {
      key: '/'
    });
    const event2 = new InputEvent('input', {
      data: '/'
    });
    inputEl.value = '1/';
    inputEl.dispatchEvent(event1);
    inputEl.dispatchEvent(event2);
    fixture.detectChanges();

    expect(inputEl.value).toEqual('01/');
  });
});

describe('Date placeholder mask helpers', () => {
  const datePattern = 'dd/mm/yyyy';
  const dateSlots = new Set('dmy');
  const acceptRegex = new RegExp('\\d', 'g');

  describe('getIndexOfLastCharacter', () => {
    it('should return 0 if the last character is passed as undefined', () => {
      const index = getIndexOfLastCharacter('abcd', undefined);

      expect(index).toBe(0);
    });

    it('should return 0 if the last character is passed as empty string', () => {
      const index = getIndexOfLastCharacter('abcd', '');

      expect(index).toBe(0);
    });

    it('should return 0 if the last character has length more than 1', () => {
      const index = getIndexOfLastCharacter('abcd', 'cd');

      expect(index).toBe(0);
    });

    it('should return 0 if the string is empty', () => {
      const index = getIndexOfLastCharacter('', '1');

      expect(index).toBe(0);
    });

    it('should return last index of the character', () => {
      const index = getIndexOfLastCharacter('13/11/2', '2');

      expect(index).toBe(7);
    });

    it('should return last index of the character even if it is repeated', () => {
      const index = getIndexOfLastCharacter('22/12/2200', '2');

      expect(index).toBe(8);
    });
  });

  describe('formatInputWithDatePattern', () => {
    it('should return date pattern if input is empty', () => {
      const result = formatInputWithDatePattern(datePattern, acceptRegex, dateSlots, '');

      expect(result).toBe('dd/mm/yyyy');
    });

    it('should replace pattern characters with user input while disregarding non numberic characters', () => {
      const result = formatInputWithDatePattern(datePattern, acceptRegex, dateSlots, 'ab1/2@34//%$');

      expect(result).toBe('12/34/yyyy');
    });
  });

  describe('formatForDisplay', () => {
    it('should return empty string if input is empty', () => {
      const result = formatForDisplay(datePattern, acceptRegex, '', 'dd/mm/yyyy', 0);

      expect(result).toBe('');
    });

    it('should return formatted value without pattern characters', () => {
      const result = formatForDisplay(datePattern, acceptRegex, '1234', '12/34/yyyy', 5);

      expect(result).toBe('12/34');
    });

    it('should return formatted value without pattern characters even if cursor is in the middle of the input', () => {
      const result = formatForDisplay(datePattern, acceptRegex, '1234', '12/34/yyyy', 2);

      expect(result).toBe('12/34');
    });

    it('should keep characters in front of cursor even if cursor is in the middle of the input and new value is added', () => {
      const result = formatForDisplay(datePattern, acceptRegex, '12/34/59678', '12/34/5967', 8);

      expect(result).toBe('12/34/5967');
    });
  });
});
