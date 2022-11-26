const singleEmail = (x, item) => {
  return `
          <div class="QAbox">
            <div class="row">
                <p class="sub">${item.title}</p>
                <p class="sub">${item.date}</p>
            </div>
              <p class="add">${x}</p>
          </div>
          `;
};

const pieEmail = (item) => {
  return `   
      <div class="QAbox">
          <div class="row">
              <p class="sub">${item.title}</p>  
              <p class="sub">${item.date}</p>
          </div>
          <div class="column">
              <p class="sub">How I feel physically</p>
              <p class="add">${item.physical}</p>

              <p class="sub">Insights & thoughts</p>
              <p class="add">${item.insights}</p>
              
              <p class="sub">How I feel emotionally</p>
              <p class="add">${item.emotions}</p>
              
              <p class="sub">How I feel spiritually</p>
              <p class="add">${item.spiritual}</p>
          </div>
      </div>
    `;
};

const selfEmail = (item) => {
  return ` 
      <div class="QAbox">
        <div class="row">
            <p class="sub">${item.title}</p>  
            <p class="sub">${item.date}</p>
        </div>
        <div class="column">
            <p class="sub">Initial Thought:</p>
            <p class="add">${item.initial}</p>
        </div>
        <div class="column">
            <p class="sub">Rational Thought:</p>
            <p class="add">${item.rational}</p>
        </div>
      </div>
    `;
};

const checkEmail = (item) => {
  return `   
    <div class="QAbox">
      <div class="row">
          <p class="sub">${item.title}</p>  
          <p class="sub">${item.time} - ${item.date}</p>
      </div>
      <div class="row">
          <p class="sub">Physical: ${item.phys}</p>
          <p class="sub">Emotional: ${item.mental}</p>
          <p class="sub">Outlook: ${item.outlook}</p>
      </div>
      <div class="row">
          <p class="add">${item.feelOne}</p>
          <p class="add">${item.feelTwo}</p>
          <p class="add">${item.feelThree}</p>
      </div>
          ${item.myCheckin ? `<p class="add">${item.myCheckin}</p>` : `</>`}
    </div>
      `;
};

const emailEntries = (fullReport) => {
  let htmlBlock = [];

  for (let item of fullReport) {
    item.check ? htmlBlock.push(checkEmail(item)) : null;
    item.myCoping ? htmlBlock.push(singleEmail(item.myCoping, item)) : null;
    item.myThat ? htmlBlock.push(singleEmail(item.myThat, item)) : null;
    item.myFocus ? htmlBlock.push(singleEmail(item.myFocus, item)) : null;
    item.myBad ? htmlBlock.push(singleEmail(item.myBad, item)) : null;
    item.myGood ? htmlBlock.push(singleEmail(item.myGood, item)) : null;
    item.myValue ? htmlBlock.push(singleEmail(item.myValue, item)) : null;
    item.physical ? htmlBlock.push(pieEmail(item)) : null;
    item.initial ? htmlBlock.push(selfEmail(item)) : null;
  }

  return htmlBlock.join("");
};

export { emailEntries, checkEmail };
