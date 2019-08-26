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

  setDisplay() {
    this.backdrop.style.display = 'block'
    this.modal.style.display = 'block'
  }

  @Method()
  async open(callback: Function) {
    console.log(callback);

    this.backdrop.style.display = 'block';
    this.modal.style.display = 'block';

    // setTimeout(() => {
    //   this.isOpen = true;
    // }, 100);
    callback();
  }

  @Method()
  async close(e: any) {
    if (e.target.classList.value === 'modal fade' ) {
      this.isOpen = false;

      setTimeout(() => {
        this.modal.style.display = 'none';
        this.backdrop.style.display = 'none';
      }, 100);
    }
  }

  render() {
    // console.log(this.isOpen);

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
