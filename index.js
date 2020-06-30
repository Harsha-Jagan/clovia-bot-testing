//imports and initialize vars
const { Builder, By, Key, until } = require("selenium-webdriver");
var expOutput = "";
const webdriver = require("selenium-webdriver");

//helper function to wait for page to update
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Checks if the chabot's output matches the expected output
async function check(driver, expected, testId) {
  await sleep(2000);
  //remove spaces, \n, \n
  expected = expected.replace(/\n|\r| /g, "").trim();
  serverMsgs = await driver.findElements(By.className("chat from-server"));

  //get server response
  actual = await serverMsgs[serverMsgs.length - 1].getText();
  //trim
  actual = actual.replace(/\n|\r| /g, "").trim();

  //perform check
  if (actual === expected)
    console.log("Test", testId, "was successfully passed!");
  else {
    console.log("Test", testId, "failed for some reason.");
    //  console.log("Expected output: \n", expected, "end of output");
    //  console.log("What the server outputed: \n", actual, "end of output");
  }
}
//tester for clovia bot
async function cloviaTesting() {
  try {
    //setup selenium for firefox and connect to website
    const driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://clovia.com");
    await sleep(5000);
    //click the message with chatbot button
    await driver.findElement(By.className("RFgVntLkdd")).click();
    await sleep(2000);

    //change to the chatbot iframe
    await driver
      .switchTo()
      .frame(driver.findElement(By.className("afBeKihWKD")));

    //get list of elements satisfying xcode filter
    var chatbox = await driver.findElements(
      By.xpath("//form/input[@placeholder='Send a message...']")
    );

    //Testcase 0
    chatbox[0].sendKeys("Hello", Key.RETURN);
    expOutput =
      "Hi I'm your Clovia Sales Assistant. How can I help you today? Do you\
     Want your Order Delivery Status?\
     Want to buy a product?\
     Want to see frequently asked questions?\
     Want help with your size & fit?\
     Want to chat with an Agent? ";
    await check(driver, expOutput, 0);

    //Testcase 1
    chatbox[0].sendKeys("Main Menu", Key.RETURN);
    expOutput =
      "HiI'myourCloviaSalesAssistant.HowcanIhelpyoutoday?DoyouWantyourOrderDeliveryStatus?Wanttobuyaproduct?Wanttoseefrequentlyaskedquestions?Wanthelpwithyoursize&fit?WanttochatwithanAgent?";
    await check(driver, expOutput, 1);

    //Testcase 2
    chatbox[0].sendKeys("Help & FAQ", Key.RETURN);
    expOutput =
      "PleaseselectyourqueryrelatedtoReturnPolicyExchangePolicyRefundPolicyWalletPolicyShippingPolicyMainMenu";
    await check(driver, expOutput, 2);

    //Testcase 3
    chatbox[0].sendKeys("Main Menu", Key.RETURN);
    expOutput =
      "HiI'myourCloviaSalesAssistant.HowcanIhelpyoutoday?DoyouWantyourOrderDeliveryStatus?Wanttobuyaproduct?Wanttoseefrequentlyaskedquestions?Wanthelpwithyoursize&fit?WanttochatwithanAgent?";
    await check(driver, expOutput, 3);

    //Testcase 4
    chatbox[0].sendKeys("Want to see frequently asked questions?", Key.RETURN);
    expOutput =
      "Please select your query related to\nReturn Policy\nExchange Policy\nRefund Policy\nWallet Policy\nShipping Policy\nMain Menu";
    await check(driver, expOutput, 4);

    //Testcase 5
    chatbox[0].sendKeys("Return Policy", Key.RETURN);
    expOutput =
      "21 days from date of delivery you can raise the Return for refund and Exchange request for Bras.\n\n      Briefs (panties) and Bra panty sets, and some of the shapewear are nonreturnable and nonexchangeable\n\n         For More Info Click Here  \n Was it helpful?\nYesNoMain Menu";
    await check(driver, expOutput, 5);

    //Testcase 6
    chatbox[0].sendKeys(
      "days from date of delivery you can raise the Return",
      Key.RETURN
    );
    expOutput =
      "21 days from date of delivery you can raise the Return for refund and Exchange request for Bras.\n\n      Briefs (panties) and Bra panty sets, and some of the shapewear are nonreturnable and nonexchangeable\n\n         For More Info Click Here  \n Was it helpful?\nYesNoMain Menu";
    await check(driver, expOutput, 6);

    driver.quit();
  } catch (e) {
    console.log(e);
  }
}

cloviaTesting();
