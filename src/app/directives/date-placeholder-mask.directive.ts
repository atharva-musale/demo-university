import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { findDuplicate, formatForDisplay, formatInputWithDatePattern } from './date-placeholder-mask.helpers';

/**
 * Directive for masking placeholder of date input,User no need to type '/'.Default placeholder is "dd/mm/yyyy"
 */
@Directive({
  selector: '[datePlaceholderMask]'
})
export class DatePlaceholderMaskDirective implements OnChanges {
  /**
   * Date pattern accepted by datepicker
   */
  @Input()
  public datePlaceholderMask = 'dd/mm/yyyy';

  /**
   * Input date placeholder backspace to remove user input
   */
  protected isBackspace = false;

  /**
   * Whether user has pressed forward slash or not
   */
  protected isForwardSlash = false;

  /**
   * @deprecated will be removed in v13.0, please use acceptOnlyNumbers instead
   * Input date accept only number
   */
  protected readonly accept = '\\d';

  /**
   * @deprecated will be removed in v13.0, please use dateSlots instead
   * Input date slots consists dmy
   */
  protected slots = 'dmy';

  /**
   * Regular expression that accepts only numbers
   * Since we expect user input to be a number
   */
  protected readonly acceptOnlyNumbers = new RegExp('\\d', 'g');

  /**
   * Input date slots, it includes set of unique characters in the format in that order, for example:
   * - for 'dd/mm/yyyy' the value will be 'dmy'
   * - for 'mm/dd/yyyy' the value will be 'mdy'
   */
  protected dateSlots: Set<string>;

  /**
   * This is an array which stores the value of cursor index for each input character user will enter
   * have the same value. Example for 'dd/mm/yyyy' value will be [1, 2, 2, 4, 5, 5, 7, 8, 9, 10]
   */
  protected expectedCursorValues: number[];

  /**
   * Values from expected cursor values which are repeated
   * They represent the index at which forward slash is expected
   */
  protected repeatedCursorValues: number[];

  constructor(protected readonly el: ElementRef) {
    this.dateSlots = this.generateSlotsByPattern(this.datePlaceholderMask);
    this.expectedCursorValues = this.generateExpectedCursorIndexValues(this.datePlaceholderMask);
    this.repeatedCursorValues = findDuplicate(this.expectedCursorValues);
  }

  /**
   * Listen to keyboard input event on the input date field to format date placeholder
   *
   * @param event
   */
  @HostListener('input', ['$event'])
  public onInput(event: Event) {
    this.updatePattern();

    // Execution order might be different, so other inputs should react correctly to a value after pattern cleanup
    if (event instanceof InputEvent) {
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }

  /**
   * Listen to keyboard keydown event to delete user input
   *
   * @param event
   */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    this.isBackspace = event.key === 'Backspace';
    this.isForwardSlash = event.key === '/';
  }

  /**
   * Listen to blur event to check whether user input is equal to placeholder or not
   */
  @HostListener('blur', [])
  public onBlur() {
    if (this.el.nativeElement.value === this.datePlaceholderMask) {
      this.el.nativeElement.value = '';
    }
  }

  protected updatePattern() {
    let selectedValue = this.el.nativeElement.value as string;

    if (this.isForwardSlash && this.repeatedCursorValues.includes(this.el.nativeElement.selectionStart)) {
      const valueBeforeSlash = this.el.nativeElement.value.slice(0, this.el.nativeElement.selectionStart - 1);
      if (valueBeforeSlash.length > 0) {
        selectedValue = this.el.nativeElement.value.slice(0, -2) + '0' + this.el.nativeElement.value.slice(-2);
        this.isForwardSlash = false;
      }
    }

    // Determines the position of cursor
    const [start, end] = [this.el.nativeElement.selectionStart, this.el.nativeElement.selectionEnd].map((value) => {
      value = formatInputWithDatePattern(
        this.datePlaceholderMask,
        this.acceptOnlyNumbers,
        this.dateSlots,
        selectedValue.slice(0, value)
      ).split('').findIndex((index) => this.dateSlots.has(index as string));
      return value < 0 ? this.expectedCursorValues.at(-1) : (this.isBackspace ? this.expectedCursorValues[value - 1] || 0 : value);
    });

    const formattedValue = formatInputWithDatePattern(this.datePlaceholderMask, this.acceptOnlyNumbers, this.dateSlots, selectedValue);
    this.el.nativeElement.value = formatForDisplay(this.datePlaceholderMask, this.acceptOnlyNumbers, selectedValue, formattedValue, end);

    this.el.nativeElement.setSelectionRange(start, end);
    if (this.el.nativeElement.value === this.datePlaceholderMask) {
      this.el.nativeElement.value = '';
    }
  }

  /**
   * @deprecated will be removed in v13, please use formatDatePattern instead
   *
   * @param input user input value
   * @param datePattern date pattern
   * @param dateSlots date slots
   * @param dateAccept date accept
   * @returns formatted value
   */
  protected formatDateMask(input: string, datePattern: string, dateSlots = 'dmy', dateAccept: string): string {
    const slots = new Set(dateSlots);
    const accept = new RegExp(dateAccept || '//d', 'g');
    const inputArray = input.match(accept) || [];
    return Array.from(datePattern, (value) =>
      inputArray[0] === value || slots.has(value) ? inputArray.shift() || value : value).join('');
  }

  /**
   * Creates slots based on date pattern
   *
   * @param pattern date pattern
   * @returns set of accepted slot values
   */
  protected generateSlotsByPattern(pattern: string): Set<string> {
    const slots = pattern.split('/').map((part) => part.charAt(0)).join('');
    return new Set(slots);
  }

  /**
   * Generates list of numbers which correspond to the expected cursor index for each slot for a given pattern
   *
   * @param pattern date pattern
   * @returns index array
   */
  protected generateExpectedCursorIndexValues(pattern: string): number[] {
    return (
      (value) => Array.from(pattern, (currentChar, index) => this.dateSlots.has(currentChar) ? value = index + 1 : value)
    )(0);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.datePlaceholderMask) {
      // if the date placeholder is invalid format, then default it to dd/mm/yyyy
      this.datePlaceholderMask = this.datePlaceholderMask.includes('/') && this.datePlaceholderMask.split('/').length === 3 ? this.datePlaceholderMask : 'dd/mm/yyyy';
      this.dateSlots = this.generateSlotsByPattern(this.datePlaceholderMask);
      this.expectedCursorValues = this.generateExpectedCursorIndexValues(this.datePlaceholderMask);
      this.repeatedCursorValues = findDuplicate(this.expectedCursorValues);
    }
  }
}
