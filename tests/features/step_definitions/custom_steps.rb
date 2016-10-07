require 'selenium-cucumber'
require 'rspec'

Given(/^I open the webpage$/) do
  $page = $driver.get("http://127.0.0.1/digdug/index.html");
end

Then(/^I should see "([^"]*)" in the title$/) do |title|
  expect($driver.title()).to eq(title)
end
