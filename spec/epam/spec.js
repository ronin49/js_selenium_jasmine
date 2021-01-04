describe("epam ",function() {

  beforeAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterAll(function() {
    driver.quit();
  });

  const {Builder,By} = require("selenium-webdriver");
  driver = new Builder().forBrowser("chrome").build();
  mainpage = "https://www.epam.com/";
  servicepage = "https://www.epam.com/services";
  contactpage = "https://www.epam.com/about/who-we-are/contact"

  async function linkWorks(button,source,destination) {
    if(source == destination)
      console.log("function linkWorks: source cannot be equal to destination!");
    await driver.get(source);
    await driver.executeScript("arguments[0].click();", button);
    while(await driver.getCurrentUrl() == source) {}
    expect(await driver.getCurrentUrl()).toBe(destination);
  }

/*
  it("logo redirectes on home page",async function() {
    button = driver.findElement(By.className("header__logo"));
    source = servicepage;
    destination = mainpage;
    await linkWorks(button,source,destination);
  });

  it("cookies are shown", async function() {
    await driver.get(mainpage);
    await driver.findElement(By.className("cookie-disclaimer__description"));
  });
    
  it("contact page accessible", async function() {
    button = driver.findElement(By.className("cta-button-ui cta-button--envelope header__control"));
    source = mainpage;
    destination = contactpage;
    expect(await linkWorks(button,source,destination));
  });
*/

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

  it("Suggestions are clickable", async function() {
    await driver.get(mainpage);
    magnifier = driver.findElement(By.className("header-search__button header__icon")); 
    search = driver.findElement(By.className("header-search__input")); 
    suggestion = driver.findElement(By.className("frequent-searches__item")); 
    await driver.executeScript("arguments[0].click();", magnifier);
    await sleep(3000);
    suggestionText = await suggestion.getText();
    await driver.executeScript("arguments[0].click();", suggestion);
    expect(await search.getAttribute("value")).toBe(suggestionText);
  });
 
});
