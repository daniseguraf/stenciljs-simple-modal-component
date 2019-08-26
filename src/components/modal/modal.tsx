import { Component, h, Method, Prop } from '@stencil/core'

@Component({
  tag: 'ce-modal',
  styleUrl: 'modal.css',
  shadow: true
})

export class Modal {
  modal: HTMLElement;
  backdrop: HTMLElement;
  @Prop({mutable: true, reflectToAttr: true}) isOpen = false;

  @Method()
  async open() {
    this.backdrop.style.display = 'block';
    this.modal.style.display = 'block';

    document.querySelector('body').classList.add('modal-open');

    setTimeout(() => {
      this.isOpen = true;
    }, 100);
  }

  @Method()
  async close(e: any) {
    if (e.target.classList.value === 'modal fade' ) {
      this.isOpen = false;

      document.querySelector('body').classList.remove('modal-open');

      setTimeout(() => {
        this.modal.style.display = 'none';
        this.backdrop.style.display = 'none';
      }, 150);
    }
  }

  render() {
    return [
      <div class="modal fade" onClick={this.close.bind(this)} ref={el => this.modal = el }>
        <div class="modal-dialog">
          <div class="modal-content">
            <slot />
          </div>
        </div>
      </div>,
      <div class="modal-backdrop fade" style={{ 'display': 'none' }} ref={el => this.backdrop = el}></div>
    ]
  }
}
