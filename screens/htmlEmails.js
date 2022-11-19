export const featureEmail = {
  html: `
      <html>
      <head>
      <style>
      .bg {
        display: flex;
        height: ${windowHeight};
        flex-direction: column;
        background-color: #1B2A41;
        font-family: roboto, arial, sans-serif;
      }
      .topBox {
        justify-content: flex-start;
        margin-left: ${windowWidth * 0.1};
      }
      .add {
        margin-right: ${windowWidth * 0.1};
        font-size: 18;
        font-weight: bold;
        color: #D7D9D7;
      }
      .title {
        padding-top: ${windowHeight * 0.05};
        font-size: 25;
        font-weight: bold;
        color: #D7D9D7;
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ##3C5E90;
      }
      .subTitle {
        font-size: 20;
        font-weight: bold;
        color: #D7D9D7;
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ##3C5E90;
      }
      .sub {
        margin-right: ${windowWidth * 0.1};
        text-align: flex-start;
        align-items: center;
        opacity: 0.6;
        font-size: 15px;
        font-weight: bold;
        color: #D7D9D7;
      }
      .QAbox {
        padding-top: 3%;
        bottom-border: 1% solid #3C5E90
      }
      </style>
      </head>
      <div class="bg">
        <p class="title">Ourtre Team,</p>
        <p class="subTitle">I think there should be a feature called: ${
          feature.name
        }</p>
        <div class="topBox">
          <div class="QAbox">
            <div class="sub">This is what I think it should do:</div>
            <div class="add">${feature.whatsItDo}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This is how I think it should work:</div>
            <div class="add">${feature.howsItWork}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This sort of thing is/would be helpful to me because:</div>
            <div class="add">${feature.howsItHelp}</div>
          </div>
          <div class="QAbox">
            <div class="sub"> In my mind this is how I think it should look:</div>
            <div class="add">${feature.howsItLook}</div>
          </div>
          <div class="QAbox">
            <div class="sub">More notes:</div>
            <div class="add">${feature.notes}</div>
          </div>
          <div class="QAbox">
            <div class="sub">Thanks, </div>
            <div class="add">${token.name}</div>
          </div>
        </div>
      </div>
      </container>
      </html>
      `,
};

export const reportEmail = {};

export const bugEmail = {
  html: `
  <html>
  <head>
  <style>
  .bg {
    display: flex;
    height: ${windowHeight};
    flex-direction: column;
    background-color: #1B2A41;
    font-family: roboto, arial, sans-serif;
  }
  .topBox {
    justify-content: flex-start;
    margin-left: ${windowWidth * 0.1};
  }
  .add {
    margin-right: ${windowWidth * 0.1};
    font-size: 18;
    font-weight: bold;
    color: #D7D9D7;
  }
  .title {
    padding-top: ${windowHeight * 0.05};
    font-size: 25;
    font-weight: bold;
    color: #D7D9D7;
    margin-left: ${windowWidth * 0.1};
    bottom-border: 3px solid ##3C5E90;
  }
  .subTitle {
    font-size: 20;
    font-weight: bold;
    color: #D7D9D7;
    margin-left: ${windowWidth * 0.1};
    bottom-border: 3px solid ##3C5E90;
  }
  .sub {
    margin-right: ${windowWidth * 0.1};
    text-align: flex-start;
    align-items: center;
    opacity: 0.6;
    font-size: 15px;
    font-weight: bold;
    color: #D7D9D7;
  }
  .QAbox {
    padding-top: 3%;
    bottom-border: 1% solid #3C5E90
  }
  </style>
  </head>
  <div class="bg">
    <p class="title">Ourtre Team,</p>
    <p class="subTitle">I think there should be a feature called: ${
      feature.name
    }</p>
    <div class="topBox">
      <div class="QAbox">
        <div class="sub">This is what I think it should do:</div>
        <div class="add">${feature.whatsItDo}</div>
      </div>
      <div class="QAbox">
        <div class="sub">This is how I think it should work:</div>
        <div class="add">${feature.howsItWork}</div>
      </div>
      <div class="QAbox">
        <div class="sub">This sort of thing is/would be helpful to me because:</div>
        <div class="add">${feature.howsItHelp}</div>
      </div>
      <div class="QAbox">
        <div class="sub"> In my mind this is how I think it should look:</div>
        <div class="add">${feature.howsItLook}</div>
      </div>
      <div class="QAbox">
        <div class="sub">More notes:</div>
        <div class="add">${feature.notes}</div>
      </div>
      <div class="QAbox">
        <div class="sub">Thanks, </div>
        <div class="add">${token.name}</div>
      </div>
    </div>
  </div>
  </container>
  </html>
  `,
};
