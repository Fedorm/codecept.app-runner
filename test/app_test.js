
Feature('Dummy test');

Scenario('User enters homepage', (I) => {
  I.amOnPage('/');
  I.see('Up!');
});
