import { Page } from '@playwright/test';
//Funkcja ta pozwala na znalezienie Iframe'a poprzez określenie selektora, którego chcemy znaleźć w danym Iframie.
//Pozwala to na dostanie się do prawidłowego Iframe'a nawet jeżeli nie jesteśmy pewni jaką będzie miał nazwę.
//Ponadto funkcja ta czeka, aż dany Iframe załaduje się do końca, co ułatwia uniknięcie błędów związanych z próbą interakcji z elementami, które jeszcze się nie załadowały.
export async function findIframeWithSelector(page: Page, selector: string, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    for (const frame of page.frames()) {
      const hasSelector = await frame.$(selector);
      if (hasSelector) {
        return frame;
      }
    }
    await page.waitForTimeout(200);
  }
  throw new Error(`Timeout: Couldn't find iframe with selector ${selector}`);
}