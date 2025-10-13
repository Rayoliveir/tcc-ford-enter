import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-documentation-modal',
  standalone: true,
  imports: [],
  templateUrl: './documentation-modal.component.html',
  styleUrls: ['./documentation-modal.component.scss']
})
export class DocumentationModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}