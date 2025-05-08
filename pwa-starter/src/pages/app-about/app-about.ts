import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import { styles } from './about-styles';

import { styles as sharedStyles } from '../../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-about')
export class AppAbout extends LitElement {
  @state() imageUrl: string | null = null;

  static styles = [
    sharedStyles,
    styles,
    css`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #input-area {
        min-width: 300px;
        min-height: 300px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
      }

      img.preview {
        max-width: 90%;
        max-height: 280px;
        object-fit: contain;
      }

      input[type='file'] {
        display: none;
      }

      sl-button {
        margin-top: 16px;
      }
    `,
  ];
  private handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  private triggerUpload() {
    const input = this.renderRoot.querySelector<HTMLInputElement>('#fileInput');
    // <input type="file"> 클릭됨 -> @change 트리거
    input?.click();
  }
  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main class="container">
        <h2>이미지 업로드</h2>

        <sl-card>
          <div id="input-area">
            ${this.imageUrl
              ? html`<img
                  class="preview"
                  src="${this.imageUrl}"
                  alt="미리보기"
                />`
              : html`<span>미리보기</span>`}
          </div>
        </sl-card>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          @change="${this.handleFileChange}"
        />

        <sl-button variant="primary" @click="${this.triggerUpload}">
          이미지 업로드
        </sl-button>
      </main>
    `;
  }
}

