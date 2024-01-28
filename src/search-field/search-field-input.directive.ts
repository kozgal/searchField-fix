import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';

/**
 * Sapphire search input field.
 */
@Directive({
  selector: 'input[spSearchFieldInput]',
  host: {
    class: 'sapphire-search-field__input',
    type: 'search',
    '[placeholder]': 'placeholder || " "',
  },
  exportAs: 'spSearchFieldInput',
})
export class SearchFieldInputDirective {
  /**
   * Whether the input is disabled
   */
  @HostBinding('class.is-disabled')
  @Input()
  disabled?: BooleanInput;

  /**
   * Emitted when `Enter` is pressed to submit the search
   */
  @Output('spSearchFieldSubmitted')
  submitted = new EventEmitter<string>();

  /**
   * Input's placeholder
   */
  @Input()
  placeholder?: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clear();
    } else if (event.key === 'Enter') {
      this.submitted.emit(this.elementRef.nativeElement.value);
    }
  }

  clear() {
    const element: HTMLInputElement | undefined = this.elementRef.nativeElement;

    if (element) {
      // element.value of course needs to get updated so the new value will be reflected in the UI
      element.value = '';

      // But, changing the value of the htmlElement does not update the ngModel binding, unfortunately.
      // There are a few ways to get around this, we could emit an event on the input element to trigger state update like this:
      element.dispatchEvent(new InputEvent('input'));

      // We could also instead make an output event and emit the new value, which parent component could then use to update value from emitted event, though I suppose this is not so performant, but would work nevertheless
      // this.onValueUpdated.emit('');

      element.focus();
      // Normally to prevent focus loss when pressing a button, I would expect event.preventDefault to do the trick, but in this case that doesn't work, so element.focus is the easy way to bring focus back to the input field. Alternatively, we could add tabIndex="-1" to the clear button, which looks better, but is bad for accessibility since it then cannot be reached with keyboard navigation. So even though this way of maintaining focus involves a quick visual "blink", I'd argue it's better than using tabIndex, although tabIndex looks better visually since the input field never loses focus to begin with.
    }
  }
}
