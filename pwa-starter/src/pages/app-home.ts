import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {
  @property() message = '메모장';

  static styles = [
    styles,
    css`
      #welcomeBar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 16px;
      }

      #welcomeCard {
        width: 100%;
      }
      #infoCard {
        padding: 18px;
        padding-top: 0px;
      }

      sl-card::part(footer) {
        display: flex;
        justify-content: flex-end;
      }

      @media (min-width: 750px) {
        sl-card {
          width: 70vw;
        }
      }

      @media (horizontal-viewport-segments: 2) {
        #welcomeBar {
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }

        #welcomeCard {
          margin-right: 64px;
        }
      }
    `,
  ];
  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // 높이 초기화
    textarea.style.height = textarea.scrollHeight + 'px'; // 실제 텍스트 높이로 확장
  }

  async firstUpdated() {
    console.log('Note Page');
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="welcomeBar">
          <sl-card id="welcomeCard">
            <div slot="header">
              <h2>${this.message}</h2>
            </div>

            <textarea
              id="memoInput"
              placeholder="메모를 입력하세요..."
              @input=${this.autoResize}
              style="
                width: 100%;
                min-height: 300px;
                resize: none;
                overflow: hidden;
                font-size: 1rem;
                border: none;
                outline: none;
              "
            ></textarea>
          </sl-card>

          <sl-button href="${resolveRouterPath('about')}" variant="primary"
            >이미지 업로드하기</sl-button
          >
        </div>
      </main>
    `;
  }
}

