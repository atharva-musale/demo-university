/**
 * Formats the user input value based on the date placeholder mask
 * Example: if the date placeholder mask is 'dd/mm/yyyy' and user input is '1234', then the formatted value will be '12/34/yyyy'
 *
 * @param datePattern date pattern
 * @param acceptRegex regex to filter out unwanted values
 * @param dateSlots set of characters in date pattern
 * @param input user input value
 * @returns formatted value with date mask
 */
export function formatInputWithDatePattern(datePattern: string, acceptRegex: RegExp, dateSlots: Set<string>, input: string): string {
  const inputArray = input.match(acceptRegex) || [];
  return Array.from(datePattern, (value) =>
    inputArray[0] === value || dateSlots.has(value) ? inputArray.shift() || value : value).join('');
}

/**
 * Removes pattern characters from the formatted value even if cursor position is in the middle of the input
 *
 * @param datePattern date pattern
 * @param acceptRegex regex to filter out unwanted values
 * @param input user input value
 * @param formattedValue formatted value of the input (example for 1234 input, formatted value will be '12/34/yyyy')
 * @param currentCursorPosition current cursor position
 * @returns formatted value without pattern characters
 */
export function formatForDisplay(datePattern: string, acceptRegex: RegExp, input: string, formattedValue: string, currentCursorPosition: number): string {
  const inputArray = input.match(acceptRegex) || [];
  if (inputArray.length === 0) {
    return '';
  }
  // If user adds a new value in between when the date is completely filled
  // Example: current value: 01/01/20|00 where | is cursor index and then user enters 1
  const lastValue = input.length > datePattern.length ? formattedValue.at(-1) : inputArray.at(-1);
  const lastIndex = getIndexOfLastCharacter(formattedValue, lastValue);
  return formattedValue.slice(0, Math.max(currentCursorPosition, lastIndex));
}

/**
 * Gives the index of the last character in the formatted value which was filled by the user
 *
 * @param stringValue formatted value of the input
 * @param lastCharacter last character filled by user
 * @returns index of the last character in the formatted value
 */
export function getIndexOfLastCharacter(stringValue: string, lastCharacter: string | undefined): number {
  if (lastCharacter && lastCharacter?.length === 1) {
    for (let i = stringValue.length - 1; i >= 0; i--) {
      if (stringValue[i] === lastCharacter) {
        return i + 1;
      }
    }
  }
  return 0;
}

/**
 * Returns the array with duplicate elements
 *
 * @param array
 */
export function findDuplicate<T>(array: T[]): T[] {
  const duplicates: T[] = [];
  const unique: T[] = [];
  for (const element of array) {
    if (unique.includes(element)) {
      duplicates.push(element);
    } else {
      unique.push(element);
    }
  }
  return Array.from(new Set(duplicates));
}
