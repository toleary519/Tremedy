const singleEmail = (x, item) => {
  return `
          <div class="QAbox">
            <div>
                <p class="dateTime">${item.title} : ${item.date}</p>
            </div>
              <p class="sub">${x}</p>
          </div>
          `;
};

const pieEmail = (item) => {
  return `   
      <div class="QAbox">
          <div>
              <p class="dateTime">${item.title} : ${item.date}</p>  
          </div>
          <div>
              <p class="sub">How I feel physically : ${item.physical}</p>

              <p class="sub">Insights & thoughts : ${item.insights}</p>
              
              <p class="sub">How I feel emotionally : ${item.emotions}</p>
              
              <p class="sub">How I feel spiritually : ${item.spiritual}</p>
          </div>
      </div>
    `;
};

const selfEmail = (item) => {
  return ` 
      <div class="QAbox">
        <div>
          <p class="dateTime">${item.title} : ${item.date}</p>  
        </div>
        <div>
          <p class="sub">Initial Thought: ${item.initial}</p>
        </div>
        <div>
          <p class="sub">Rational Thought: ${item.rational}</p>
        </div>
      </div>
    `;
};

const checkEmail = (item) => {
  return `   
    <div class="QAbox">
      <div>
        <p class="dateTime">${item.title} : ${item.time} - ${item.date}</p>
      </div>
      <div>
        <p class="sub">Physical: ${item.phys} - Emotional:${
    item.mental
  } - Outlook:${item.outlook}</p>
      </div>
      <div>
        <p class="add">${item.feelOne} : ${item.feelTwo} : ${item.feelThree}</p>
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
